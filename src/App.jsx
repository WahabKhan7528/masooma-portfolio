import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import NavOverlay from './components/NavOverlay';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import TransitionWrapper from './components/shared/TransitionWrapper';

// Lazy-load page components
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
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
    <Router>
      <div className="relative w-full min-h-screen">
        {isLoading && <Preloader onComplete={onPreloaderComplete} />}

        <CustomCursor />

        <Header toggleMenu={openMenu} />
        <NavOverlay isOpen={isMenuOpen} closeMenu={closeMenu} />

        <SmoothScroll>
          <TransitionWrapper>
            {(location) => (
              <main className="relative z-10 w-full flex flex-col items-center">
                <Suspense fallback={null}>
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Routes>
                </Suspense>
              </main>
            )}
          </TransitionWrapper>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </SmoothScroll>
      </div>
    </Router>
  );
}

export default App;
