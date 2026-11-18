import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { sectionIds } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import About from './sections/About'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Resume from './sections/Resume'

function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeId={activeId} />
      <main className="flex-1">
        <Home />
        <Projects />
        <Resume />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
