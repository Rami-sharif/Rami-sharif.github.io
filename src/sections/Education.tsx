import SectionTitle from '../components/SectionTitle'

const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Advanced (C1)' },
]

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle number="05" title="Education & Languages" />
        <div className="education-content">
          <div className="education-card">
            <div className="education-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div className="education-info">
              <h3>Bachelor's Degree in Telecommunication Engineering</h3>
              <p className="education-school">University of Aleppo, Syria</p>
            </div>
          </div>

          <div className="languages-section">
            <h3 className="languages-title">Languages</h3>
            <div className="languages-grid">
              {languages.map((lang) => (
                <div key={lang.name} className="language-card">
                  <div className="language-name">{lang.name}</div>
                  <div className="language-level">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
