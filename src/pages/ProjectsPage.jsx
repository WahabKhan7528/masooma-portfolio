import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('../components/Projects'));
const Manifesto = lazy(() => import('../components/ProjectManifesto'));

function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <div className="projects-page-container pt-20">
        {/* Typographic Manifesto at the top */}
        <Manifesto />
        
        {/* Unified Projects List */}
        <Projects />
      </div>
    </Suspense>
  );
}

export default ProjectsPage;
