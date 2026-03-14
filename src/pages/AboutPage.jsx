import { lazy, Suspense } from 'react';
const About = lazy(() => import('../components/About'));
const Experience = lazy(() => import('../components/Experience'));
const Process = lazy(() => import('../components/Process'));

function AboutPage() {
  return (
    <Suspense fallback={null}>
      <div className="pt-20 w-full flex flex-col items-center">
        <About />
        <Experience />
        <Process />
      </div>
    </Suspense>
  );
}

export default AboutPage;
