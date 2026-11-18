import { site } from '../../data/site'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-5 py-8 sm:px-6 text-sm text-muted sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex gap-6">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-fg">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
