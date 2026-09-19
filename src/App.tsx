import Layout from './components/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Certificates from './sections/Certificates'
import Education from './sections/Education'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certificates />
      <Education />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </Layout>
  )
}

export default App
