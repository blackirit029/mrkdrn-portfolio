import { useEffect, useRef } from 'react'

/** How long a lit cell takes to fade out (seconds) */
const FADE_SECONDS = 1.1
/** Average gap between ambient "twinkles" while idle (ms) */
const TWINKLE_EVERY = 220

/**
 * A living grid background: cells under the pointer light up teal and leave a fading
 * trail, and a few random cells softly twinkle on their own so the section feels alive
 * even when idle. Drawn on a canvas behind the content; follows the light/dark theme;
 * pauses when off-screen or in a hidden tab; static with reduced motion.
 *
 * Place it inside a `relative` container; it listens for pointer movement on that container.
 */
function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let cell = 56
    let cols = 0
    let rows = 0
    let offsetX = 0
    let offsetY = 0
    let glow = new Float32Array(0)
    // glow = teal RGB; fill/edge = peak opacity of a lit cell's fill and outline (dark needs more to read)
    let colors = { line: '', glow: '', fill: 0, edge: 0 }

    const readColors = () => {
      const dark = document.documentElement.classList.contains('dark')
      colors = dark
        ? { line: 'rgba(255, 255, 255, 0.08)', glow: '45, 212, 191', fill: 0.34, edge: 0.75 }
        : { line: 'rgba(9, 9, 11, 0.07)', glow: '13, 148, 136', fill: 0.2, edge: 0.55 }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = width < 640 ? 44 : 56
      cols = Math.ceil(width / cell) + 1
      rows = Math.ceil(height / cell) + 1
      // Center the grid so partial cells are split evenly on both sides
      offsetX = ((width % cell) - cell) / 2
      offsetY = ((height % cell) - cell) / 2
      glow = new Float32Array(cols * rows)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Lit cells
      for (let i = 0; i < glow.length; i++) {
        const value = glow[i]
        if (value <= 0.01) continue
        const x = offsetX + (i % cols) * cell
        const y = offsetY + Math.floor(i / cols) * cell
        ctx.fillStyle = `rgba(${colors.glow}, ${value * colors.fill})`
        ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1)
        if (value > 0.4) {
          ctx.strokeStyle = `rgba(${colors.glow}, ${(value - 0.4) * colors.edge})`
          ctx.strokeRect(x + 1.5, y + 1.5, cell - 2, cell - 2)
        }
      }

      // Grid lines
      ctx.beginPath()
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(offsetX + c * cell) + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let r = 0; r <= rows; r++) {
        const y = Math.round(offsetY + r * cell) + 0.5
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.strokeStyle = colors.line
      ctx.lineWidth = 1
      ctx.stroke()
    }

    readColors()
    resize()
    draw()

    // Redraw on theme and size changes (also covers the static, reduced-motion grid)
    const themeObserver = new MutationObserver(() => {
      readColors()
      draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(canvas)

    if (reduceMotion) {
      return () => {
        themeObserver.disconnect()
        resizeObserver.disconnect()
      }
    }

    const light = (col: number, row: number, value: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return
      const i = row * cols + col
      glow[i] = Math.max(glow[i], value)
    }

    // Pointer trail: light every cell between the previous and current position so fast moves stay continuous
    let last: { col: number; row: number } | null = null
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const col = Math.floor((e.clientX - rect.left - offsetX) / cell)
      const row = Math.floor((e.clientY - rect.top - offsetY) / cell)
      if (last) {
        const steps = Math.max(Math.abs(col - last.col), Math.abs(row - last.row))
        for (let s = 1; s <= steps; s++) {
          light(Math.round(last.col + ((col - last.col) * s) / steps), Math.round(last.row + ((row - last.row) * s) / steps), 1)
        }
      } else {
        light(col, row, 1)
      }
      last = { col, row }
    }
    const onLeave = () => {
      last = null
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    // Animation loop: runs only while the grid is on screen and the tab is visible
    let frame = 0
    let previous = 0
    let sinceTwinkle = 0
    let onScreen = true

    const tick = (time: number) => {
      const dt = previous ? Math.min((time - previous) / 1000, 0.1) : 0
      previous = time

      const fade = dt / FADE_SECONDS
      for (let i = 0; i < glow.length; i++) if (glow[i] > 0) glow[i] = Math.max(0, glow[i] - fade)

      // Ambient twinkles keep the section alive when nobody is hovering
      sinceTwinkle += dt * 1000
      if (sinceTwinkle > TWINKLE_EVERY * (0.5 + Math.random())) {
        sinceTwinkle = 0
        light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 0.35 + Math.random() * 0.3)
      }

      draw()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame || !onScreen || document.hidden) return
      previous = 0
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    visibility.observe(canvas)
    const onVisibilityChange = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibilityChange)
    start()

    return () => {
      stop()
      themeObserver.disconnect()
      resizeObserver.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // Fade the grid out toward the edges so it frames the content instead of competing with it
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black_30%,transparent_100%)] motion-safe:animate-fade-in"
    />
  )
}

export default InteractiveGrid
