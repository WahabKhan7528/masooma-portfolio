import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  const overlayRef = useRef(null);
  const pathRef = useRef(null);
  const logoRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  // Initialize SVG path and logo
  useGSAP(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
        strokeWidth: 1,
      });
    }
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, y: 20 });
    }
  }, []);

  const handleTransition = contextSafe(() => {
    const path = pathRef.current;
    const len = path.getTotalLength();
    const targetWidth = window.innerWidth < 768 ? 300 : 700;

    const tl = gsap.timeline();

    tl.to(overlayRef.current, { 
      opacity: 1, 
      duration: 0.3, 
      ease: "expo.inOut",
      force3D: true,
      onStart: () => { overlayRef.current.style.pointerEvents = "all"; }
    })
    .to(path, { 
      strokeDashoffset: 0, 
      strokeWidth: targetWidth, 
      duration: 0.8, 
      ease: "expo.inOut",
      force3D: true
    })
    // Fade in logo when covered
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      force3D: true
    }, "-=0.2")
    .add(() => {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }, "+=0.1")
    // Fade out logo before reveal
    .to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: "power2.in",
      force3D: true
    })
    .to(path, { 
      strokeDashoffset: -len, 
      strokeWidth: 1, 
      duration: 0.8, 
      ease: "expo.inOut",
      force3D: true
    })
    .to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: "expo.inOut",
      force3D: true,
      onComplete: () => {
        overlayRef.current.style.pointerEvents = "none";
        gsap.set(path, { strokeDashoffset: len });
        gsap.set(logoRef.current, { y: 20 }); // reset for next time
      }
    });
  });

  useGSAP(() => {
    if (location.pathname !== displayLocation.pathname) {
      handleTransition();
    }
  }, [location]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center opacity-0 bg-black/5 backdrop-blur-sm"
        style={{ willChange: "opacity" }}
      >
        <div ref={logoRef} className="absolute z-10 pointer-events-none" style={{ willChange: "transform, opacity" }}>
           <span 
             className="font-display text-6xl sm:text-8xl md:text-[120px] lowercase tracking-tighter select-none"
             style={{ color: '#E6E1DD' }}
           >
             mb.
           </span>
        </div>
        <svg
          width="100%" height="100%" viewBox="0 0 1316 664" fill="none"
          className="w-full h-full scale-150 sm:scale-125 lg:scale-150"
          preserveAspectRatio="xMidYMid slice"
          style={{ shapeRendering: "geometricPrecision" }}
        >
          <path
            ref={pathRef}
            style={{ willChange: "stroke-dashoffset, stroke-width" }}
            d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
            stroke="rgb(var(--color-accent-violet))"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="page-content-wrapper">{children(displayLocation)}</div>
    </>
  );
};

export default TransitionWrapper;

