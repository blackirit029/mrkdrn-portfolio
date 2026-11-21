// Brand logos from Simple Icons (https://simpleicons.org, CC0). Each export is { path, hex, title }.
import {
  siBitbucket,
  siClaude,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siNextdotjs,
  siReact,
  siRedux,
  siSubversion,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siYarn,
  type SimpleIcon,
} from 'simple-icons'

/** Skill name (as written in skills.ts) → its logo */
export const skillIcons: Record<string, SimpleIcon> = {
  ReactJS: siReact,
  'React Native': siReact,
  Redux: siRedux,
  TypeScript: siTypescript,
  'Next.js': siNextdotjs,
  'Vue.js': siVuedotjs,
  'Tailwind CSS': siTailwindcss,
  HTML: siHtml5,
  CSS: siCss,
  Git: siGit,
  SVN: siSubversion,
  GitHub: siGithub,
  Bitbucket: siBitbucket,
  Yarn: siYarn,
  Claude: siClaude,
}

/**
 * Near-black logos (Next.js, GitHub) would vanish in dark mode, so those follow the text color;
 * every other logo keeps its brand color.
 */
export function iconColor(icon: SimpleIcon) {
  return isNearBlack(icon) ? 'currentColor' : `#${icon.hex}`
}

const channels = (hex: string) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)

function isNearBlack(icon: SimpleIcon) {
  const [r, g, b] = channels(icon.hex)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.15
}

/** WCAG relative luminance of an sRGB color (channels 0–1) */
function relativeLuminance([r, g, b]: number[]) {
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

const toHex = (rgb: number[]) => `#${rgb.map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`

/**
 * Hover fill for a skill chip: the brand color, with white text on top.
 * Light brand colors (e.g. React's cyan) are deepened just enough for white text to stay
 * readable (4.5:1 contrast), so the hue is kept. Near-black brands (Next.js, GitHub) use the
 * page's foreground color instead, so the fill stays visible in dark mode.
 */
export function chipHover(icon: SimpleIcon): { fill: string; text: string } {
  if (isNearBlack(icon)) return { fill: 'var(--color-fg)', text: 'var(--color-page)' }

  let rgb = channels(icon.hex)
  const whiteContrast = (c: number[]) => 1.05 / (relativeLuminance(c) + 0.05)
  for (let step = 0; step < 20 && whiteContrast(rgb) < 4.5; step++) {
    rgb = rgb.map((c) => c * 0.93) // nudge toward black, keeping the hue
  }
  return { fill: toHex(rgb), text: '#ffffff' }
}
