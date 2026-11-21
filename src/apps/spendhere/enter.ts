import type { CSSProperties } from 'react'

/**
 * Staggered entrance from the left for the cards on each tab: card `index` starts
 * `step` ms after the previous one. Tabs remount on switch, so the stagger replays.
 */
export const enter = (index: number, step = 90): { className: string; style: CSSProperties } => ({
  className: 'motion-safe:animate-slide-in-left',
  style: { animationDelay: `${index * step}ms` },
})
