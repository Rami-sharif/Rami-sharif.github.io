import SectionTitle from '../components/SectionTitle'

const projects = [
  {
    title: 'RAM — AI Agent Working in the SOC',
    description:
      'AI-powered SOC investigation agent that investigates Wazuh alerts with read-only tools, threat intelligence, and semantic memory of past incidents, then hands analysts a MITRE-mapped case in TheHive.',
    image: '/images/ram-soc.png',
    link: 'https://ram-soc.site/',
    tags: ['Wazuh', 'AI Agent', 'RAG Memory', 'Threat Intel', 'TheHive', 'MITRE ATT&CK'],
  },
  {
    title: 'Secure IoT Communication Architecture',
    description:
      'Production architecture for distributed ESP32 deployments — mutual TLS, MQTT/EMQX broker, OpenVPN remote access, and pfSense network segmentation.',
    image: '/images/project-iotsec-nics.png',
    link: '/projects/iot_report.html',
    tags: ['ESP32', 'MQTT/EMQX', 'mTLS/PKI', 'OpenVPN', 'pfSense'],
  },
  {
    title: 'Firewall Simulation',
    description:
      'Python-based firewall simulation using Scapy to block malicious traffic and DoS attacks in lab environments.',
    image: '/images/Python-for-Cybersecurity_-How-to-Protect-Your-Business-from-Threats_big.jpg',
    link: '/projects/firewall-report.html',
    repo: 'https://github.com/Rami-sharif/FireWall',
    tags: ['Python', 'Scapy', 'Network Security'],
  },
  {
    title: 'Eye Mouse Control',
    description: 'AI-powered desktop app to control the mouse using eye movements with OpenCV and MediaPipe.',
    image: '/images/eye controll cover.png',
    link: 'https://github.com/Rami-sharif/Eye-controlled-mouse.git',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
  },
]

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle number="06" title="Featured Projects" />
        <div className="projects-grid">
          {projects.map((project) => {
            const cardInner = (
              <>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  {project.link && (
                    <div className="project-overlay">
                      <span className="project-link" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-repo-btn"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                      </svg>
                      GitHub Repo
                    </a>
                  )}
                </div>
              </>
            )

            return project.link ? (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-card project-card-link"
                aria-label={`Open ${project.title}`}
              >
                {cardInner}
              </a>
            ) : (
              <div className="project-card" key={project.title}>
                {cardInner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects

