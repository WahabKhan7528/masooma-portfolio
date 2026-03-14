import { lazy, Suspense } from 'react';
const Contact = lazy(() => import('../components/Contact'));

function ContactPage() {
  return (
    <Suspense fallback={null}>
      <div className="pt-20">
        <Contact />
      </div>
    </Suspense>
  );
}

export default ContactPage;
