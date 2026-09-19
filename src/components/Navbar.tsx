import { useEffect, useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const onScroll = () => {
      let current = '#home'
      sections.forEach((section) => {
        const top = section.offsetTop
        if (window.scrollY >= top - 200) {
          current = `#${section.id}`
        }
      })
      setActive(current)

      const navbar = document.querySelector('.navbar')
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled')
        } else {
          navbar.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleClick = (href: string) => {
    const section = document.querySelector<HTMLElement>(href)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleClick('#home') }} className="logo-text" aria-label="Go to home">
            {'<RS/>'}
          </a>
        </div>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(link.href)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={`menu-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          role="button"
          tabIndex={0}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onKeyDown={(e) => { if (e.key === 'Enter') setMenuOpen((open) => !open) }}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>
      <div
        className={`menu-overlay${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  )
}

export default Navbar
