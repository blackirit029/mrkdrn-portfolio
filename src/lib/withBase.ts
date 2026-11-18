/**
 * Prefixes a site-relative path with the deploy base (e.g. "/mrkdrn-portfolio/" on GitHub Pages, "/" in dev),
 * so links and images keep working when the site isn't served from the domain root.
 */
export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
