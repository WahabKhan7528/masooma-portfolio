import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const container = useRef(null);
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animFrameRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text-anim', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.2
        })
            .from('.hero-subtitle', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power2.out'
            }, "-=0.8");

    }, { scope: container });

    // Particle trail: canvas setup & animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            const section = container.current;
            if (!section) return;
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Animation loop
        const animate = () => {
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
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    const handleMouseMove = useCallback((e) => {
        const section = container.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Enhance particle trail based on feedback: more, bigger, longer-lasting
        for (let i = 0; i < 6; i++) {
            particles.current.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y + (Math.random() - 0.5) * 15,
                radius: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                life: 2, // Lasts longer
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
                <style>
                    {`
                    @keyframes heroMarquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-hero-marquee {
                        animation: heroMarquee 30s linear infinite;
                        will-change: transform;
                    }
                    `}
                </style>
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
};

export default Hero;
