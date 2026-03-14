import { lazy, Suspense } from 'react';
const Projects = lazy(() => import('../components/Projects'));

function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <div className="pt-20">
        <Projects />
      </div>
    </Suspense>
  );
}

export default ProjectsPage;
