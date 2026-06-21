import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null);
    const squiggleRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const progressObj = useRef({ val: 0 });

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }
        });

        tl.to(counterRef.current, { y: -30, opacity: 0, duration: 0.8, ease: "power3.inOut" })
            .to(textRef.current, { y: -30, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.6")
            .to(squiggleRef.current, { scaleX: 0, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.7")
            .to(preloaderRef.current, { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.4");

        const updateVisualProgress = (targetValue) => {
            gsap.to(progressObj.current, {
                val: targetValue,
                duration: 0.5,
                ease: "power1.out",
                onUpdate: () => {
                    setProgress(Math.round(progressObj.current.val));
                },
                onComplete: () => {
                    if (targetValue === 100 && Math.round(progressObj.current.val) === 100) {
                        setTimeout(() => tl.play(), 400);
                    }
                }
            });
        };

        const images = Array.from(document.querySelectorAll('img'));
        const totalImages = images.length;
        let loadedImages = 0;

        if (totalImages === 0) {
            gsap.to(progressObj.current, {
                val: 100,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => setProgress(Math.round(progressObj.current.val)),
                onComplete: () => setTimeout(() => tl.play(), 400)
            });
        } else {
            const imageLoaded = () => {
                loadedImages++;
                const percent = (loadedImages / totalImages) * 100;
                updateVisualProgress(percent);
            };

            images.forEach((img) => {
                if (img.complete) {
                    imageLoaded();
                } else {
                    img.addEventListener('load', imageLoaded);
                    img.addEventListener('error', imageLoaded);
                }
            });
        }

        const fallbackTimeout = setTimeout(() => {
            if (progressObj.current.val < 100) updateVisualProgress(100);
        }, 8000);

        return () => {
            clearTimeout(fallbackTimeout);
            tl.kill();
            gsap.killTweensOf(progressObj.current);
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-bg text-dark-text"
        >
            <div className="flex flex-col items-center">
                <div ref={textRef} className="font-display text-accent-violet text-xl sm:text-2xl tracking-[0.2em] uppercase mb-4 opacity-80">
                    Masooma Batool
                </div>
                
                {/* Minimal Drawing Squiggle */}
                <div ref={squiggleRef} className="w-[280px] mb-6">
                    <svg width="100%" height="32" viewBox="0 0 240 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Background track */}
                        <path 
                            d="M 0 16 C 15 16, 15 4, 30 4 C 45 4, 45 28, 60 28 C 75 28, 75 4, 90 4 C 105 4, 105 28, 120 28 C 135 28, 135 4, 150 4 C 165 4, 165 28, 180 28 C 195 28, 195 4, 210 4 C 225 4, 225 16, 240 16" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            className="text-dark-text/10"
                        />
                        {/* Animated fill */}
                        <path 
                            d="M 0 16 C 15 16, 15 4, 30 4 C 45 4, 45 28, 60 28 C 75 28, 75 4, 90 4 C 105 4, 105 28, 120 28 C 135 28, 135 4, 150 4 C 165 4, 165 28, 180 28 C 195 28, 195 4, 210 4 C 225 4, 225 16, 240 16" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            pathLength="100"
                            className="text-accent-violet"
                            style={{
                                strokeDasharray: 100,
                                strokeDashoffset: 100 - progress,
                                transition: 'stroke-dashoffset 0.1s linear'
                            }}
                        />
                    </svg>
                </div>

                <div ref={counterRef} className="font-display text-[clamp(60px,15vw,120px)] leading-none font-bold tabular-nums">
                    {progress}%
                </div>
            </div>
        </div>
    );
};

export default Preloader;
