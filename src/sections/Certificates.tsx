import SectionTitle from '../components/SectionTitle'

type Certificate = {
  name: string
  link?: string
}

const obtained: Certificate[] = [
  {
    name: 'Google Cybersecurity Certificate',
    link: 'https://coursera.org/share/826d278d46a9977c9fb088519601189b',
  },
  {
    name: 'Security Engineer (TryHackMe)',
    link: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-XWKYA9SXAG.pdf',
  },
  {
    name: 'Web Security Fundamentals (TryHackMe)',
    link: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IJWFRVZ6CS.pdf',
  },
  {
    name: 'eJPT / eEDA (in progress)',
  },
]

const selfStudy: Certificate[] = [
  { name: 'CompTIA Network+ (Self-Study)' },
  { name: 'CompTIA Security+ (Self-Study)' },
  { name: 'Certified Ethical Hacker (CEH) – Self-Study' },
]

function CertificateCard({ name, link }: Certificate) {
  return (
    <div className="certificate-card">
      <div className="certificate-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      </div>
      <h3>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="certificate-link">
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
    </div>
  )
}

function Certificates() {
  return (
    <section id="certificates" className="section">
      <div className="container">
        <SectionTitle number="04" title="Certificates & Training" />

        <h3 className="certificates-subtitle">Certifications & Professional Training</h3>
        <div className="certificates-grid">
          {obtained.map((cert) => (
            <CertificateCard key={cert.name} name={cert.name} link={cert.link} />
          ))}
        </div>

        <h3 className="certificates-subtitle">Self-Study</h3>
        <div className="certificates-grid">
          {selfStudy.map((cert) => (
            <CertificateCard key={cert.name} name={cert.name} link={cert.link} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
