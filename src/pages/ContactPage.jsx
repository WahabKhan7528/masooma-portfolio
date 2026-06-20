import { lazy, Suspense } from 'react';

const ContactHero = lazy(() => import('../components/ContactHero'));
const Contact = lazy(() => import('../components/Contact'));
const FAQ = lazy(() => import('../components/FAQ'));

function ContactPage() {
  return (
    <Suspense fallback={null}>
      <div className="pt-20">
        <ContactHero />
        <Contact />
        <FAQ />
      </div>
    </Suspense>
  );
}

export default ContactPage;
