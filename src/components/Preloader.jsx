import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null);
    const [progress, setProgress] = useState(0);

    // This ref holds the floating-point progress to tween, ensuring a smooth visual jump avoiding stutter.
    const progressObj = useRef({ val: 0 });

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }
        });

        // Sequence to fade out preloader (runs when progress reaches 100)
        tl.to(counterRef.current, { y: -50, opacity: 0, duration: 0.8, ease: "power3.inOut" })
            .to(textRef.current, { y: -50, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.6")
            .to(preloaderRef.current, { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.4");

        // Helper function that smoothly animates the GSAP counter up to the target value
        const updateVisualProgress = (targetValue) => {
            gsap.to(progressObj.current, {
                val: targetValue,
                duration: 0.5, // Smoothly animate to the new percentage using 0.5s duration
                ease: "power1.out",
                onUpdate: () => {
                    setProgress(Math.round(progressObj.current.val));
                },
                onComplete: () => {
                    // Check if we reached 100 on both the target and the underlying object value
                    if (targetValue === 100 && Math.round(progressObj.current.val) === 100) {
                        setTimeout(() => {
                            tl.play(); // trigger the out-animation with a tiny pause
                        }, 400);
                    }
                }
            });
        };

        // Detect all image elements currently in the DOM. 
        // Because Preloader is mounted at the same time as App's content, the img tags exist.
        const images = Array.from(document.querySelectorAll('img'));
        const totalImages = images.length;
        let loadedImages = 0;

        if (totalImages === 0) {
            // No images found on the site — fallback to just animating normally over 1.5 seconds.
            gsap.to(progressObj.current, {
                val: 100,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => setProgress(Math.round(progressObj.current.val)),
                onComplete: () => {
                    setTimeout(() => tl.play(), 400);
                }
            });
        } else {
            // Track the loading status of every image.
            const imageLoaded = () => {
                loadedImages++;
                const percent = (loadedImages / totalImages) * 100;
                updateVisualProgress(percent);
            };

            images.forEach((img) => {
                if (img.complete) {
                    imageLoaded(); // Already loaded from cache
                } else {
                    img.addEventListener('load', imageLoaded);
                    img.addEventListener('error', imageLoaded); // Count errors as loaded to prevent hanging
                }
            });
        }

        // Safety net fallback: Force completion after 10 seconds just in case.
        const fallbackTimeout = setTimeout(() => {
            if (progressObj.current.val < 100) {
                updateVisualProgress(100);
            }
        }, 10000);

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
            <div className="flex flex-col items-center overflow-hidden">
                <div ref={textRef} className="font-display text-accent-violet text-xl sm:text-2xl tracking-[0.2em] uppercase mb-4 opacity-80">
                    Masooma Batool
                </div>
                {/* Use tabular-nums to prevent character width wobbling during fast count */}
                <div ref={counterRef} className="font-display text-[clamp(60px,15vw,120px)] leading-none font-bold tabular-nums">
                    {progress}%
                </div>
            </div>

            {/* Loading Bar at bottom mapping to the exact same 'progress' state */}
            <div className="absolute bottom-10 w-[60%] sm:w-[40%] h-[2px] bg-dark-text/20 overflow-hidden rounded-full">
                <div
                    className="h-full bg-accent-violet rounded-full"
                    style={{
                        width: `${progress}%`,
                        transition: 'width 0.1s linear' // small CSS transition to handle micro-stutters
                    }}
                />
            </div>
        </div>
    );
};

export default Preloader;
