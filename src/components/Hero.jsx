import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const container = useRef(null);

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

    return (
        <section ref={container} id="home" className="relative min-h-[100vh] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32 overflow-hidden">
            {/* Massive One-Line Name */}
            <h1 className="font-display font-bold leading-[0.9] tracking-[-2px] sm:tracking-[-4px] md:tracking-[-6px] w-full text-center mb-12 sm:mb-20">
                <div className="overflow-hidden w-full px-4">
                    <span className="hero-text-anim block text-[clamp(50px,16vw,300px)] text-primary-text">
                        Mas<span className="text-accent-violet">oo</span>ma <span>Bat<span className="text-accent-violet">oo</span>l
                        </span></span>
                </div>
            </h1>
            {/* Bottom Marquee Band matching reference image */}
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
