# Portfolio

A minimal single-page portfolio built with React (functional components and hooks), TypeScript, Tailwind CSS v4 and Vite. All sections sit on one scrolling page, the navbar highlights the section in view, and each section fades in as it appears. A light/dark toggle in the header follows the OS setting until the visitor picks a theme, which is remembered.

Colors come from semantic tokens defined in `src/index.css` (`bg-page`, `text-fg`, `text-body`, `text-muted`, `border-line`, `bg-chip`, `bg-inverse`, ...). Each token has a light and a dark value, so components switch themes without `dark:` classes. Use these tokens instead of raw palette colors when adding UI.

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # lint with oxlint
```

## Structure

```
src/
  components/
    layout/   Navbar, Footer
    ui/       Section (scroll target + fade-in), PageHeader, ProjectCard, SkillList, Tag
  data/       site.ts, projects.ts, resume.ts, skills.ts  <- edit your content here
  hooks/      useActiveSection (scroll-spy), useInView (fade-in trigger)
  sections/   Home, Projects, Resume, About
  apps/
    journalhere/  JournalHere mini app (Journal + Todo tabs), served at /journalhere/
    shophere/     ShopHere demo store (search, categories, top products, cart), served at /shophere/
    spendhere/    SpendHere expense tracker (Dashboard, Transactions, Budgets tabs), served at /spendhere/
  types/      shared TypeScript interfaces
  App.tsx     stacks the sections in order
  main.tsx    entry point
  index.css   Tailwind import, theme and fade-in keyframes
```

## Mini projects

Each mini project is a separate page in the same Vite build. It has an HTML entry (for example `journalhere/index.html`) registered under `build.rollupOptions.input` in `vite.config.ts`, and its source lives in `src/apps/<name>/`. The apps share the portfolio's theme tokens and light/dark setting. To link a project card to its app, set `liveUrl` in `src/data/projects.ts`.

ShopHere's product photos are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License) and are stored in `public/shophere/`.

## Customizing

All placeholder content lives in `src/data/`. Change your name, role, links and email in `site.ts`, your projects in `projects.ts`, and your experience and education in `resume.ts`, and your skills in `skills.ts`.
