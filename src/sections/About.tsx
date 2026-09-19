import { useRef, useState } from 'react'
import SectionTitle from '../components/SectionTitle'

function useCountUp(target: number, duration = 2000): [number, (el: HTMLDivElement | null) => void] {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = (el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
    if (!el) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const startTime = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    observerRef.current.observe(el)
  }

  return [count, setRef]
}

function About() {
  const [expYearsCount, expYearsRef] = useCountUp(2)
  const [projectsCount, projectsRef] = useCountUp(5)
  const [clientsCount, clientsRef] = useCountUp(3)

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle number="01" title="About Me" />
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a <span className="highlight">Network and Security Engineer</span> with over 2 years of
              experience securing on-prem, cloud, and hybrid infrastructures across Saudi Arabia, the UK,
              and Germany.
            </p>
            <p>
              I specialize in secure network design, system hardening, and SOC operations, and I'm
              familiar with aligning security controls with frameworks like{' '}
              <span className="highlight">ISO/IEC 27001</span>, <span className="highlight">NIST</span>,
              and Saudi <span className="highlight">NCA Essential Cybersecurity Controls (ECC)</span>.
            </p>
            <div className="about-stats" ref={expYearsRef}>
              <div className="stat">
                <span className="stat-number">{expYearsCount}+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat" ref={projectsRef}>
                <span className="stat-number">{projectsCount}+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat" ref={clientsRef}>
                <span className="stat-number">{clientsCount}+</span>
                <span className="stat-label">Countries Served</span>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="code-block">
              <div className="code-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <pre>
                <code>
                  <span className="keyword">const</span> <span className="variable">securityEngineer</span> = {'{'}
                  {'\n'}
                  {'  '}
                  <span className="property">name</span>: <span className="string">"Rami Sharif"</span>,
                  {'\n'}
                  {'  '}
                  <span className="property">role</span>:{' '}
                  <span className="string">"Network & Security Engineer"</span>,
                  {'\n'}
                  {'  '}
                  <span className="property">expertise</span>: [{'\n'}
                  {'    '}
                  <span className="string">"Security Operations & SIEM"</span>, {'\n'}
                  {'    '}
                  <span className="string">"Network Security"</span>, {'\n'}
                  {'    '}
                  <span className="string">"Cloud Security (AWS, GCP)"</span>, {'\n'}
                  {'    '}
                  <span className="string">"Code Security"</span>, {'\n'}
                  {'    '}
                  <span className="string">"IoT & PKI"</span>, {'\n'}
                  {'    '}
                  <span className="string">"Scripting & Automation"</span>
                  {'\n'} {'  '}],{'\n'}
                  {'  '}
                  <span className="property">status</span>: <span className="string">"ready to secure"</span>
                  {'\n'}
                  {'};'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
