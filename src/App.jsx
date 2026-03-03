import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';

// Lazy-load below-fold sections for smaller initial bundle
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Process = lazy(() => import('./components/Process'));
const Projects = lazy(() => import('./components/Projects'));
const Marquee = lazy(() => import('./components/Marquee'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const onPreloaderComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <div className="relative w-full min-h-screen">
      {isLoading && <Preloader onComplete={onPreloaderComplete} />}

      <CustomCursor />

      <Header toggleMenu={openMenu} />
      <NavOverlay isOpen={isMenuOpen} closeMenu={closeMenu} />

      <SmoothScroll>
        <main className="relative z-10 w-full flex flex-col items-center">
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Experience />
            <Process />
            <Projects />
            <Marquee />
            <Testimonials />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </SmoothScroll>
    </div>
  );
}

export default App;
