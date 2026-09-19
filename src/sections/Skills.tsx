import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import SectionTitle from '../components/SectionTitle'

type Skill = {
  id: string
  title: string
  description: string[]
  tools: string[]
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons = {
  soc: (
    <svg {...iconProps}>
      <path d="M3 12h3l2-7 4 14 2-7h7" />
      <circle cx="20" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  network: (
    <svg {...iconProps}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="12" cy="11" r="2" />
      <path d="M5 8v2a2 2 0 0 0 2 2h3" />
      <path d="M19 8v2a2 2 0 0 1-2 2h-3" />
      <path d="M12 13v3" />
    </svg>
  ),
  cloud: (
    <svg {...iconProps}>
      <path d="M17 18a4 4 0 0 0 0-8 6 6 0 0 0-11.7 1.5A3.5 3.5 0 0 0 6 18z" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  ),
  web: (
    <svg {...iconProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  automation: (
    <svg {...iconProps}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  iot: (
    <svg {...iconProps}>
      <rect x="3" y="9" width="18" height="10" rx="2" />
      <path d="M7 9V6a5 5 0 0 1 10 0v3" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  ),
}

const skills: Skill[] = [
  {
    id: 'soc',
    title: 'Security Operations & SIEM',
    description: [
      'Detect, analyze, and respond to security incidents within SOC environments.',
      'Perform log analysis and correlation across multiple data sources.',
      'Monitor endpoints, servers, and network devices for suspicious behavior.',
    ],
    tools: ['Security Onion', 'Wazuh', 'ELK Stack', 'Splunk'],
    icon: icons.soc,
  },
  {
    id: 'network',
    title: 'Network Security',
    description: [
      'Design and implement secure network architectures with clear trust boundaries.',
      'Configure and manage firewall policies, NAT rules, and network segmentation.',
      'Deploy and maintain VPN solutions for secure remote access.',
    ],
    tools: ['pfSense', 'OpenVPN', 'HAProxy', 'Mikrotik', 'Wireguard '],
    icon: icons.network,
  },
  {
    id: 'cloud',
    title: 'Cloud Security',
    description: [
      'Harden cloud instances via OS hardening, SSH/MFA, and network controls.',
      'Secure S3 buckets with least-privilege policies, public access blocks, and encryption.',
      'Enforce least-privilege access using IAM roles with cloud logging enabled.',
    ],
    tools: ['AWS (IAM, S3, CloudTrail, VPC)', 'Google Cloud(VM,IAM,Bucket,Logging)'],
    icon: icons.cloud,
  },
  {
    id: 'code security and devops',
    title: 'Code Security & DevOps',
    description: [
      'Implement security practices into the software development lifecycle.',
      'Conduct code reviews and static analysis to identify vulnerabilities.',
      'Integrate security testing into CI/CD pipelines.',
    ],
    tools: ['OWASP Top 10', 'Burp Suite', 'SonarQube', 'GitHub Actions', 'GitLab CI'],
    icon: icons.web,
  },
  {
    id: 'automation',
    title: 'Scripting & Automation',
    description: [
      'Develop security automation scripts to support monitoring and operational tasks.',
      'Create custom scripts to simplify repetitive security and IT workflows.',
    ],
    tools: ['Python', 'Bash', 'n8n'],
    icon: icons.automation,
  },
  {
    id: 'iot',
    title: 'IoT & PKI (Advanced)',
    description: [
      'Design secure IoT communication architecture with segmented networks.',
      'Implement mTLS authentication using internal PKI with per-device identity.',
      'Automated certificate provisioning and lifecycle management.',
    ],
    tools: ['MQTT', 'EMQX', 'mTLS', 'Step-CA', 'PKI'],
    icon: icons.iot,
  },
]

type Point = { x: number; y: number }

function buildCurve(from: Point, to: Point) {
  const midX = (from.x + to.x) / 2
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`
}

function Skills() {
  const [activeId, setActiveId] = useState<string>(skills[0].id)
  const [isMobile, setIsMobile] = useState(false)

  const treeRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const skillRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const toolRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const [paths, setPaths] = useState<{ skills: string[]; tools: string[] }>({ skills: [], tools: [] })

  const activeSkill = skills.find((s) => s.id === activeId) ?? skills[0]

  const recomputePaths = useCallback(() => {
    const tree = treeRef.current
    const root = rootRef.current
    if (!tree || !root) return

    const treeRect = tree.getBoundingClientRect()
    const rootRect = root.getBoundingClientRect()
    const rootEdge: Point = {
      x: rootRect.right - treeRect.left,
      y: rootRect.top + rootRect.height / 2 - treeRect.top,
    }

    const skillPaths = skills.map((s) => {
      const el = skillRefs.current[s.id]
      if (!el) return ''
      const r = el.getBoundingClientRect()
      const skillEdge: Point = {
        x: r.left - treeRect.left,
        y: r.top + r.height / 2 - treeRect.top,
      }
      return buildCurve(rootEdge, skillEdge)
    })

    const activeEl = skillRefs.current[activeId]
    let toolPaths: string[] = []
    if (activeEl) {
      const ar = activeEl.getBoundingClientRect()
      const skillRightEdge: Point = {
        x: ar.right - treeRect.left,
        y: ar.top + ar.height / 2 - treeRect.top,
      }
      toolPaths = activeSkill.tools.map((t) => {
        const el = toolRefs.current[t]
        if (!el) return ''
        const r = el.getBoundingClientRect()
        const toolEdge: Point = {
          x: r.left - treeRect.left,
          y: r.top + r.height / 2 - treeRect.top,
        }
        return buildCurve(skillRightEdge, toolEdge)
      })
    }

    setPaths({ skills: skillPaths, tools: toolPaths })
  }, [activeId, activeSkill.tools])

  useLayoutEffect(() => {
    recomputePaths()
  }, [recomputePaths])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)

    const ro = new ResizeObserver(() => recomputePaths())
    if (treeRef.current) ro.observe(treeRef.current)
    window.addEventListener('resize', recomputePaths)
    window.addEventListener('scroll', recomputePaths, { passive: true })

    return () => {
      mq.removeEventListener('change', sync)
      ro.disconnect()
      window.removeEventListener('resize', recomputePaths)
      window.removeEventListener('scroll', recomputePaths)
    }
  }, [recomputePaths])

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle number="02" title="Skills & Tools" />
        <p className="skills-tree-hint">
          <span className="skills-tree-hint-dot" /> Click a skill to explore its tools & technologies
        </p>

        {isMobile ? (
          <div className="skills-tree-mobile">
            {skills.map((skill) => {
              const expanded = activeId === skill.id
              return (
                <div key={skill.id} className={`skill-mobile-card ${expanded ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="skill-mobile-head"
                    onClick={() => setActiveId(expanded ? '' : skill.id)}
                    aria-expanded={expanded}
                  >
                    <span className="skill-mobile-icon">{skill.icon}</span>
                    <span className="skill-mobile-title">{skill.title}</span>
                    <span className={`skill-mobile-chev ${expanded ? 'open' : ''}`} aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {expanded && (
                    <div className="skill-mobile-body">
                      {skill.description.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      <div className="skill-mobile-tools-label">Tools & Technologies</div>
                      <div className="skill-mobile-tools">
                        {skill.tools.map((tool) => (
                          <span key={tool} className="tool-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="skills-tree" ref={treeRef}>
            <svg className="skills-tree-svg" aria-hidden>
              <defs>
                <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="branchActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#bf00ff" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="branchTool" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bf00ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00ff88" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              {paths.skills.map((d, i) =>
                d ? (
                  <path
                    key={`s-${skills[i].id}`}
                    d={d}
                    className={`tree-branch ${skills[i].id === activeId ? 'tree-branch--active' : ''}`}
                    stroke={skills[i].id === activeId ? 'url(#branchActive)' : 'url(#branchGradient)'}
                    fill="none"
                  />
                ) : null,
              )}
              {paths.tools.map((d, i) =>
                d ? (
                  <path
                    key={`t-${activeSkill.tools[i]}`}
                    d={d}
                    className="tree-branch tree-branch--tool"
                    stroke="url(#branchTool)"
                    fill="none"
                  />
                ) : null,
              )}
            </svg>

            <div className="tree-col tree-col--root">
              <div className="tree-root-node" ref={rootRef}>
                <span className="tree-root-glow" aria-hidden />
                <span className="tree-root-label">Skills</span>
                <span className="tree-root-sub">Framework</span>
              </div>
            </div>

            <div className="tree-col tree-col--skills">
              {skills.map((skill) => {
                const isActive = skill.id === activeId
                return (
                  <button
                    key={skill.id}
                    type="button"
                    ref={(el) => {
                      skillRefs.current[skill.id] = el
                    }}
                    className={`tree-skill-node ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveId(skill.id)}
                    aria-pressed={isActive}
                  >
                    <span className="tree-skill-icon">{skill.icon}</span>
                    <span className="tree-skill-title">{skill.title}</span>
                    <span className="tree-skill-count">({skill.tools.length})</span>
                  </button>
                )
              })}
            </div>

            <div className="tree-col tree-col--tools">
              {activeSkill.tools.map((tool) => (
                <div
                  key={tool}
                  ref={(el) => {
                    toolRefs.current[tool] = el
                  }}
                  className="tree-tool-node"
                >
                  <span className="tree-tool-dot" aria-hidden />
                  <span className="tree-tool-label">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="skills-tree-info">
            <div className="skills-tree-info-icon">{activeSkill.icon}</div>
            <div className="skills-tree-info-text">
              <h3>{activeSkill.title}</h3>
              {activeSkill.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
