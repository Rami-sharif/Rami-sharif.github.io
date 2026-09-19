import Navbar from './Navbar'
import BackgroundScene from '../threeD/BackgroundScene'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section')

    sections.forEach((section) => {
      section.style.opacity = '0'
      section.style.transform = 'translateY(50px)'
      section.style.transition = 'all 0.8s ease-out'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <BackgroundScene />
    </>
  )
}

export default Layout


