import { useState } from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Research from './pages/Research'
import Blog from './pages/Blog'
import Navigation from './components/Navigation'
import './App.css'

type Page = 'home' | 'projects' | 'experience' | 'research' | 'blog'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'projects':
        return <Projects />
      case 'experience':
        return <Experience />
      case 'research':
        return <Research />
      case 'blog':
        return <Blog />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        <p>&copy; 2026 Jaime Cardona. All rights reserved.</p>
      </footer>
    </div>
  )
}
