import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Process from './components/Process';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <div className="relative w-full min-h-screen">
      <CustomCursor />

      <Header toggleMenu={() => setIsMenuOpen(true)} />
      <NavOverlay isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <About />
        <Experience />
        <Process />
        <Projects />
        <Marquee />
      </main>

      <Footer />
    </div>
  );
}

export default App;
