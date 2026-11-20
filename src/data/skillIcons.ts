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
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(icon.hex.slice(i, i + 2), 16) / 255)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.15 ? 'currentColor' : `#${icon.hex}`
}
