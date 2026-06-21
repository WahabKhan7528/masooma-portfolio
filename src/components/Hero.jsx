import { useRef, useEffect, useCallback, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Squiggle1, Squiggle2, Squiggle3 } from './shared/Squiggles';

const Hero = memo(() => {
    const container = useRef(null);
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animFrameRef = useRef(null);
    const isVisible = useRef(true);
    const lastSpawn = useRef(0);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text-anim', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.2
        });

        // Flowers: slow rotation and vertical float
        gsap.utils.toArray('.floating-flower').forEach((flower, i) => {
            // Give them random initial rotations
            gsap.set(flower, { rotation: Math.random() * 360 });
            
            gsap.to(flower, {
                y: `-=${15 + Math.random() * 20}`,
                x: `+=${(Math.random() - 0.5) * 20}`,
                rotation: `+=${20 + Math.random() * 40}`,
                duration: 3 + Math.random() * 3,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2
            });
        });

        // Squiggles: wobbly movement and slight rotation
        gsap.utils.toArray('.floating-squiggle').forEach((squiggle, i) => {
            gsap.to(squiggle, {
                y: `+=${(Math.random() - 0.5) * 30}`,
                x: `+=${(Math.random() - 0.5) * 30}`,
                rotation: `+=${(Math.random() - 0.5) * 30}`,
                duration: 4 + Math.random() * 2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2
            });
        });

    }, { scope: container });

    // Particle trail: canvas setup & animation loop with visibility detection
    useEffect(() => {
        const canvas = canvasRef.current;
        const section = container.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            if (!section) return;
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Pause animation when hero is not visible
        const observer = new IntersectionObserver(([entry]) => {
            isVisible.current = entry.isIntersecting;
            if (entry.isIntersecting && !animFrameRef.current) {
                animate();
            }
        }, { threshold: 0.1 });
        observer.observe(section);

        // Animation loop — only runs when visible
        const animate = () => {
            if (!isVisible.current) {
                animFrameRef.current = null;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current = particles.current.filter(p => p.life > 0);

            particles.current.forEach(p => {
                p.life -= 0.02;
                p.radius *= 0.97;
                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(161, 153, 255, ${p.life * 0.5})`;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    // Throttled particle spawning (~30fps instead of 60+)
    const handleMouseMove = useCallback((e) => {
        const now = performance.now();
        if (now - lastSpawn.current < 33) return; // ~30fps
        lastSpawn.current = now;

        const section = container.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 6; i++) {
            particles.current.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                radius: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                life: 2,
            });
        }
    }, []);

    return (
        <section
            ref={container}
            id="home"
            className="relative h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 overflow-hidden box-border"
            onMouseMove={handleMouseMove}
        >
            {/* Background Grid Lines just for Hero */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500"
                style={{
                    background: 'repeating-linear-gradient(90deg, var(--color-grid-line) 0px, var(--color-grid-line) 1px, transparent 1px, transparent calc(100% / 6))'
                }}
            />

            {/* Particle canvas — desktop only */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
            />

            {/* Floating ✿ and Squiggles */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-[15] block">
                {/* Large ✿ top left */}
                <div className="floating-flower absolute top-[15%] left-[10%] text-accent-violet opacity-60 text-[40px] sm:text-[80px] font-display flex justify-center items-center">
                    ✿
                </div>
                {/* Medium ✿ top right */}
                <div className="floating-flower absolute top-[25%] right-[18%] text-primary-text opacity-30 text-[24px] sm:text-[50px] font-serif flex justify-center items-center">
                    ✿
                </div>
                {/* Squiggle bottom left */}
                <div className="floating-squiggle absolute bottom-[35%] left-[20%] text-accent-violet opacity-50 w-12 sm:w-24">
                    <Squiggle2 className="w-full h-auto" />
                </div>
                {/* Small ✿ bottom right */}
                <div className="floating-flower absolute bottom-[25%] right-[22%] text-accent-violet opacity-80 text-[18px] sm:text-[35px] font-display flex justify-center items-center">
                    ✿
                </div>
                {/* Extra Squiggle top center */}
                <div className="floating-squiggle absolute top-[18%] left-[45%] text-primary-text opacity-20 w-10 sm:w-20 rotate-12">
                    <Squiggle1 className="w-full h-auto" />
                </div>
                {/* Additional Squiggle */}
                <div className="floating-squiggle absolute bottom-[20%] left-[40%] text-primary-text opacity-20 w-10 sm:w-20 -rotate-12">
                    <Squiggle3 className="w-full h-auto" />
                </div>
                
                {/* --- NEW ELEMENTS --- */}
                {/* Extra small ✿ bottom center */}
                <div className="floating-flower absolute bottom-[15%] right-[45%] text-primary-text opacity-25 text-[14px] sm:text-[25px] font-display flex justify-center items-center">
                    ✿
                </div>
                {/* Squiggle2 mid right */}
                <div className="floating-squiggle absolute top-[45%] right-[8%] text-accent-violet opacity-40 w-8 sm:w-16 rotate-45">
                    <Squiggle2 className="w-full h-auto" />
                </div>
                {/* Massive ✿ mid left */}
                <div className="floating-flower absolute top-[55%] left-[4%] text-primary-text opacity-10 text-[60px] sm:text-[120px] font-serif flex justify-center items-center">
                    ✿
                </div>
                {/* Squiggle1 bottom right edge */}
                <div className="floating-squiggle absolute bottom-[12%] right-[5%] text-primary-text opacity-15 w-14 sm:w-28 -rotate-45">
                    <Squiggle1 className="w-full h-auto" />
                </div>
                {/* Tiny ✿ top center-right */}
                <div className="floating-flower absolute top-[12%] right-[35%] text-accent-violet opacity-70 text-[12px] sm:text-[20px] font-display flex justify-center items-center">
                    ✿
                </div>
            </div>

            {/* Massive One-Line Name */}
            <h1 className="font-display font-bold leading-[0.9] tracking-[-2px] sm:tracking-[-4px] md:tracking-[-6px] w-full text-center mb-12 sm:mb-20 relative z-20">
                <div className="overflow-hidden w-full px-4">
                    <span className="hero-text-anim block text-[clamp(50px,16vw,300px)] text-primary-text">
                        Mas<span className="text-accent-violet">oo</span>ma <span>Bat<span className="text-accent-violet">oo</span>l
                        </span></span>
                </div>
            </h1>
            {/* Bottom Marquee Band */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-accent-violet py-3 sm:py-5 flex items-center z-20">
                <div className="flex w-max animate-hero-marquee">
                    {[0, 1].map((group) => (
                        <div key={group} className="flex shrink-0">
                            {[
                                "Figma Expert", "UI Designer", "Visual Designer",
                                "Design Systems Creator", "Wireframe Architect",
                                "Prototype Specialist", "Brand Designer",
                                "Interaction Designer", "Creative Strategist"
                            ].map((text, i) => (
                                <span key={i} className="font-display text-[30px] sm:text-[50px] md:text-[80px] text-dark-bg leading-none tracking-tight whitespace-nowrap px-4">
                                    {text} &nbsp; ✿ &nbsp;
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
