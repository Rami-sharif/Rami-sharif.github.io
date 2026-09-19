import SectionTitle from '../components/SectionTitle'

type Experience = {
  date: string
  role: string
  company: string
  location: string
  summary: string
  bullets: string[]
  tags: string[]
}

const experiences: Experience[] = [
  {
    date: 'November 2025 – Present',
    role: 'Network & Security Engineer',
    company: 'Government Sector (Confidential / NDA)',
    location: 'Remote',
    summary:
      'Leading the design and deployment of secure infrastructure for a distributed IoT ecosystem, spanning network perimeter, device identity, and centralized communication services, and testing the security of the organization’s ERP system.',
    bullets: [
      'Architected a layered security topology separating the public-facing gateway, an isolated DMZ for certificate services and monitoring, and an internal zone hosting the MQTT broker — ensuring critical services remain unreachable from the Internet.',
      'Deployed and configured pfSense as the public gateway on a cloud VPS, implementing firewall rules, NAT policies, and OpenVPN (AES-256-GCM, SHA-256 auth, TLS key protection) for secure administrative and remote-user access to internal resources.',
      'Built an internal Public Key Infrastructure using Step-CA (Docker) to serve as the trust anchor for device authentication; designed the certificate lifecycle covering on-device key generation, CSR-based enrollment, signed-certificate issuance, and local verification at runtime without CA involvement.',
      'Implemented mTLS (Mutual TLS) between edge devices and the EMQX MQTT broker, enforcing bidirectional certificate validation — devices verify the broker’s identity and the broker verifies each device’s identity, eliminating shared secrets and preventing unauthorized connections.',
      'Hardened the EMQX broker for production: enforced client certificate authentication, disabled anonymous access, configured topic-level ACLs per device identity, and restricted traffic to the TLS listener only.',
      'Designed MQTT topic hierarchy for bidirectional device-server communication (telemetry, commands, status, retained online-state), enabling real-time control while keeping the data model auditable.',
      'Produced architectural documentation and trust-model diagrams covering certificate lifecycle, network segmentation, and handshake flow to support internal handover and operational continuity.',
      'Performed vibe penetration testing on the organization’s ERP system, identifying multiple High-severity vulnerabilities and delivering professional reports with PoCs, root-cause analysis, and remediation guidance.',
    ],
    tags: [
      'pfSense',
      'OpenVPN',
      'EMQX',
      'MQTT',
      'mTLS',
      'Step-CA',
      'PKI',
      'Docker',
      'Python (paho-mqtt)',
      'Penetration Testing',
      'OWASP Top 10',
    ],
  },
  {
    date: 'April 2023 – Present',
    role: 'Security Engineer',
    company: 'Cyberpedia',
    location: 'Remote',
    summary:
      'Delivering managed security services to organizations across Saudi Arabia, the UK, and Germany in on-premises, cloud, and hybrid environments, covering SOC operations, system hardening, DevSecOps, and incident response.',
    bullets: [
      'Built an AI-powered SOC as a Service using Wazuh, n8n, Gemini AI with PostgreSQL-backed memory, and TheHive — deployed as a containerized pipeline serving multiple client environments with automated alert enrichment, AI-driven analysis, and case management.',
      'Handled security incidents such as DDoS, brute-force, credential-stuffing, and phishing campaigns — conducting triage, assisting in containment, and contributing to post-incident analysis and security improvements.',
      'Hardened client WordPress deployments through plugin and theme auditing, user and role policy enforcement, WAF rule tuning (Cloudflare), database lockdown, and removal of common misconfigurations exploited in mass-scan campaigns.',
      'Designed and implemented secure network architectures using pfSense, OpenVPN, and HAProxy, including firewalling, ACLs, and network segmentation — enabling secure remote access and granular access control. Configured and managed pfSense and MikroTik devices to isolate critical services.',
      'Led hardening efforts for internal systems and client infrastructures, including Linux and Windows servers, networks, and web applications.',
      'Embedded DevSecOps across the SDLC: secure code reviews plus SAST, SCA, secrets detection, IaC, and container image scanning in CI/CD pipelines, with ongoing tracking of vulnerabilities and remediation progress.',
      'Hardened Docker images (distroless/minimal bases, non-root users, dropped capabilities) and delivered secure-design and remediation guidance to development teams.',
      'Hardened cloud workloads on AWS and Google Cloud — applying IAM least-privilege policies, securing S3 buckets (public-access blocks, encryption at rest and in transit), and enabling CloudTrail / CloudWatch / VPC Flow Logs for audit and threat visibility.',
      'Developed Python and Bash automation scripts for repetitive monitoring, log parsing, and operational tasks — reducing manual effort across recurring client engagements.',
    ],
    tags: [
      'Wazuh',
      'TheHive',
      'MikroTik RouterOS',
      'pfSense',
      'OpenVPN',
      'HAProxy',
      'Cloudflare WAF',
      'Burp Suite',
      'OWASP ZAP',
      'WordPress',
      'AWS (IAM, S3, CloudTrail, CloudWatch, VPC)',
      'GCP',
      'Docker',
      'SonarQube',
      'GitHub Actions',
      'GitLab CI',
      'Python',
      'Bash',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle number="03" title="Work Experience" />
        <div className="timeline">
          {experiences.map((exp) => (
            <div className="timeline-item" key={`${exp.company}-${exp.date}`}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3>{exp.role}</h3>
                <p className="timeline-highlight">
                  {exp.company} — {exp.location}
                </p>
                <p className="timeline-summary">{exp.summary}</p>
                <ul className="timeline-details">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="timeline-tech-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
