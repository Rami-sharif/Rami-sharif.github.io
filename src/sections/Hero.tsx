import { useEffect, useState } from 'react'

const phrases = [
  'Security Engineer',
  'Security Analyst',
  'Network & Infrastructure Security',
  'Cloud Security',
  'IoT Security',
  'Code Security',
]

function Hero() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const justCompleted = !deleting && text === current
    const delay = justCompleted ? 2500 : deleting ? 50 : 130

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text === current) {
          setDeleting(true)
        } else {
          setText(current.slice(0, text.length + 1))
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, deleting, phraseIndex])

  const handleScrollDown = () => {
    const about = document.querySelector<HTMLElement>('#about')
    if (about) {
      about.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="greeting">Hello, I'm</p>
          <h1 className="name">Rami Sharif</h1>
          <div className="typing-container">
            <span className="typed-text">{text}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-description">
            <strong>Your partner in security.</strong>
            <br />
            <br />
            Whether you have a network, building a SOC, or developing a system
            and want your code and pipeline secured — I've got you.
            <br />
            <br />
            Take your time and look around.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary">
              Explore More
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
            <a
              href="/Rami Sharif_CV .pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              aria-label="Download Rami Sharif's CV"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="profile-container">
            <div className="profile-ring" />
            <div className="profile-ring ring-2" />
            <img
              src="/images/profile.png"
              alt="Rami Sharif"
              className="profile-image"
            />
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={handleScrollDown} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label="Scroll down to About section">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}

export default Hero
