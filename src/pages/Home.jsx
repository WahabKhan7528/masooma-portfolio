import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import BriefAbout from '../components/BriefAbout';

const Projects = lazy(() => import('../components/Projects'));
const Marquee = lazy(() => import('../components/Marquee'));
const Testimonials = lazy(() => import('../components/Testimonials'));

function Home() {
  return (
    <>
      <Hero />
      <BriefAbout />
      <Suspense fallback={null}>
        <Projects limit={2} />
        <Marquee />
        <Testimonials />
      </Suspense>
    </>
  );
}

export default Home;
