import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'

type Task = {
  title: string
  detail: string
}

type Experience = {
  date: string
  role: string
  company: string
  location: string
  summary: string
  tasks: Task[]
  tags: string[]
}

const experiences: Experience[] = [
  {
    date: 'November 2025 – Present',
    role: 'Network & Security Engineer',
    company: 'Government Sector (Confidential / NDA)',
    location: 'Remote',
    summary:
      'As the organization’s only security engineer, I protect all of its assets — the network, servers, connected IoT devices, and the business applications its teams depend on.',
    tasks: [
      {
        title: 'Kept critical systems off the public internet',
        detail:
          'Designed a segmented network with pfSense: a public gateway, a DMZ for certificate and monitoring services, and a private internal zone for the MQTT broker. Internal services have no direct path from the internet, so an attacker would have to get through several layers to reach them.',
      },
      {
        title: 'Gave staff secure remote access',
        detail:
          'Deployed pfSense as the edge firewall on a cloud server, wrote the firewall and NAT policies, and set up OpenVPN with AES-256-GCM, so admins and remote users reach internal systems only through an encrypted, authenticated tunnel.',
      },
      {
        title: 'Made sure only trusted devices can connect',
        detail:
          'Built an internal certificate authority (Step-CA) and enforced mutual TLS: every device proves its identity with its own certificate, and the server proves its identity back. There are no shared passwords to steal, and unknown devices are rejected.',
      },
      {
        title: 'Automated device identity from day one',
        detail:
          'Designed the full certificate lifecycle: each device generates its own private key, requests a certificate, and gets it signed automatically. The private key never leaves the device, and new devices are enrolled without manual work.',
      },
      {
        title: 'Locked down the MQTT broker',
        detail:
          'Hardened EMQX for production: certificate-only login, no anonymous access, TLS-only connections, and per-device topic permissions (ACLs), so a compromised device can only reach its own data.',
      },
      {
        title: 'Found and fixed 5 High-severity flaws in the ERP',
        detail:
          'Ran a penetration test on the organization’s ERP system and found 5 High-severity vulnerabilities. Wrote a report for each one with a working proof of concept, the root cause, and a clear fix — all 5 have been fixed.',
      },
      {
        title: 'Documented the security design for the team',
        detail:
          'Wrote the architecture documentation and trust-model diagrams (network zones, certificate lifecycle, connection flow), so the system can be run and handed over without depending on one person.',
      },
    ],
    tags: [
      'pfSense',
      'OpenVPN',
      'Network Segmentation',
      'EMQX',
      'MQTT',
      'mTLS',
      'Step-CA',
      'PKI',
      'Docker',
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
      'I secure client businesses in Saudi Arabia, the UK, and Germany — including an e-learning platform, an IT company, and a cybersecurity services partner — across their networks, servers, cloud, and code, and I built the AI-powered SOC that monitors them.',
    tasks: [
      {
        title: 'Designed secure networks for client infrastructure',
        detail:
          'Built segmented networks with pfSense, MikroTik, OpenVPN, and HAProxy — firewall policies, ACLs, and isolated zones for critical services — with secure remote access and fine-grained access control.',
      },
      {
        title: 'Built RAM, an AI-powered SOC',
        detail:
          'RAM is an AI agent that investigates serious Wazuh alerts before an analyst opens them. It checks threat intelligence, host history, and similar past incidents, then opens a MITRE-mapped case in TheHive — in about 13 seconds per alert. The agent only has read-only tools, so it can never change a system; a human always makes the final call.',
      },
      {
        title: 'Responded to real attacks on client systems',
        detail:
          'Handled DDoS, brute-force, credential-stuffing, and phishing attacks against client systems: triaged the alerts, helped contain each attack, and closed the gap afterwards — for example with rate limiting and WAF rules on targeted login pages.',
      },
      {
        title: 'Hardened servers, networks, and web apps',
        detail:
          'Led hardening of internal and client infrastructure — Linux and Windows servers, network devices, and web applications — closing the common misconfigurations attackers look for first.',
      },
      {
        title: 'Protected client WordPress sites',
        detail:
          'Audited plugins and themes, tightened user roles, tuned Cloudflare WAF rules, and locked down databases to protect client websites from the automated attacks that target WordPress every day.',
      },
      {
        title: 'Secured AWS and Google Cloud environments',
        detail:
          'Applied least-privilege IAM, locked down S3 buckets (public-access blocks and encryption), and enabled CloudTrail, CloudWatch, and VPC Flow Logs so every action in the account is recorded.',
      },
      {
        title: 'Built security into the development pipeline',
        detail:
          'Added secure code review and automated scanning to CI/CD — SAST, SCA, secrets detection, and IaC and container image scanning — and tracked every finding until it was fixed.',
      },
      {
        title: 'Shipped hardened Docker images',
        detail:
          'Rebuilt images on minimal and distroless bases, ran apps as non-root, and dropped unneeded Linux capabilities — and gave developers clear guidance on secure design and fixes.',
      },
      {
        title: 'Automated repetitive security work',
        detail:
          'Wrote Python and Bash scripts for monitoring, log parsing, and routine checks, cutting manual work across client engagements.',
      },
    ],
    tags: [
      'pfSense',
      'MikroTik RouterOS',
      'OpenVPN',
      'HAProxy',
      'Wazuh',
      'TheHive',
      'Gemini AI',
      'PostgreSQL (pgvector)',
      'Cloudflare WAF',
      'WordPress',
      'AWS (IAM, S3, CloudTrail, CloudWatch, VPC)',
      'GCP',
      'Docker',
      'SonarQube',
      'GitHub Actions',
      'GitLab CI',
      'Burp Suite',
      'OWASP ZAP',
      'Python',
      'Bash',
    ],
  },
]

function Experience() {
  const [openTasks, setOpenTasks] = useState<Set<string>>(new Set())

  const toggleTask = (key: string) =>
    setOpenTasks((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle number="03" title="Work Experience" />
        <div className="timeline">
          {experiences.map((exp, expIndex) => (
            <div className="timeline-item" key={`${exp.company}-${exp.date}`}>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3>{exp.role}</h3>
                <p className="timeline-highlight">
                  {exp.company} — {exp.location}
                </p>
                <p className="timeline-summary">{exp.summary}</p>
                <p className="timeline-tasks-hint">Click a task to read more</p>
                <ul className="timeline-tasks">
                  {exp.tasks.map((task, taskIndex) => {
                    const key = `${expIndex}-${taskIndex}`
                    const isOpen = openTasks.has(key)
                    const panelId = `exp-task-${key}`
                    return (
                      <li key={task.title} className={`timeline-task ${isOpen ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="timeline-task-head"
                          onClick={() => toggleTask(key)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <span className="timeline-task-title">{task.title}</span>
                          <span className="timeline-task-chev" aria-hidden>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>
                        <div className="timeline-task-panel" id={panelId} inert={!isOpen}>
                          <div className="timeline-task-panel-inner">
                            <p>{task.detail}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
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
