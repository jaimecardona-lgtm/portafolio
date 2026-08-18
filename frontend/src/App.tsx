import { useState } from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Research from './pages/Research'
import Blog from './pages/Blog'
import Navigation from './components/Navigation'
import JacChat from './components/JacChat'
import './App.css';

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
        <p>&copy; 2026 Jaime Cardona Montero · AI & Data Engineer</p>
        <p className="footer-social">
          <a href="https://github.com/ja23cardona1406" target="_blank" rel="noopener noreferrer">GitHub</a>
          {' '} · {' '}
          <a href="https://www.linkedin.com/in/jaime-andres-cardona-montero-ab2580302/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {' '} · {' '}
          <a href="mailto:jaime.cardona@rckt.es">Email</a>
        </p>
      </footer>
      <JacChat />
    </div>
  )
}
