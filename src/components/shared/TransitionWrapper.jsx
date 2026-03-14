import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('IDLE');
  
  const transitionOverlayRef = useRef(null);
  const svgPathRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (svgPathRef.current) {
      const length = svgPathRef.current.getTotalLength();
      gsap.set(svgPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeWidth: 2,
      });
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      handleTransition();
    }
  }, [location]);

  const handleTransition = () => {
    if (timelineRef.current) timelineRef.current.kill();
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitionStage('IDLE');
      }
    });
    
    timelineRef.current = tl;
    const length = svgPathRef.current.getTotalLength();

    // LEAVE ANIMATION (Curtain closing)
    tl.to(transitionOverlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power3.inOut",
      onStart: () => {
        transitionOverlayRef.current.style.pointerEvents = 'all';
      }
    })
    .to(svgPathRef.current, {
      strokeDashoffset: 0,
      strokeWidth: 600, // Increased for absolute coverage on vertical screens
      duration: 0.8,
      ease: "power3.inOut",
    }, 0)
    
    // Switch the content mid-transition
    .call(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }, null, "-=0.2") // Pre-swap slightly early

    // ENTER ANIMATION (Curtain opening)
    .to(svgPathRef.current, {
      strokeDashoffset: -length,
      strokeWidth: 2,
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.1") // Overlap slightly with leave completion
    .to(transitionOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut",
      onComplete: () => {
        transitionOverlayRef.current.style.pointerEvents = 'none';
        gsap.set(svgPathRef.current, { strokeDashoffset: length });
      }
    }, "-=0.4");
  };

  return (
    <>
      <div 
        ref={transitionOverlayRef} 
        className='fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center opacity-0 bg-black/10 backdrop-blur-sm'
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1316 664"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full scale-150 sm:scale-125 lg:scale-150"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            ref={svgPathRef}
            d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
            stroke="rgb(var(--color-accent-violet))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="page-content-wrapper">
        {children(displayLocation)}
      </div>
    </>
  );
};

export default TransitionWrapper;
