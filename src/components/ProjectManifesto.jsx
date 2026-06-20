import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';
import { Squiggle1, Squiggle2, Squiggle3 } from './shared/Squiggles';

const ProjectManifesto = () => {
    const container = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Initial state to ensure visibility if GSAP fails
        gsap.set(['.manifesto-char', '.manifesto-desc', '.pillar-item'], { opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.from('.manifesto-char', {
            y: 80,
            opacity: 0,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: 'power4.out',
        })
            .from('.manifesto-desc', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, "-=0.4")
            .from('.pillar-item', {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
            }, "-=0.3")
            .from('.bg-squiggle', {
                opacity: 0,
                scale: 0.5,
                rotation: gsap.utils.random(-30, 30, true),
                stagger: 0.15,
                duration: 1.2,
                ease: 'back.out(1.7)',
            }, "-=0.6");

        // Subtle parallax
        gsap.to(textRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }, { scope: container });

    const pillars = [
        { title: 'Intuition', desc: 'Design that feels natural and effortless.' },
        { title: 'Precision', desc: 'Every pixel crafted with surgical care.' },
        { title: 'Impact', desc: 'Creating experiences that leave a mark.' }
    ];

    return (
        <section
            ref={container}
            className="w-full min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-10 pt-16 pb-4 sm:pt-32 sm:pb-8 relative overflow-hidden z-20"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <Squiggle2 className="bg-squiggle absolute top-[15%] left-[-4%] md:left-[2%] w-28 h-18 md:w-36 md:h-24 text-[#A58BFF]/40 -rotate-12" />
                <Squiggle1 className="bg-squiggle absolute top-[20%] right-[-5%] md:right-[2%] w-24 h-24 md:w-32 md:h-32 text-[#A58BFF]/30 rotate-12" />
                <Squiggle1 className="bg-squiggle absolute bottom-[20%] left-[-2%] md:left-[3%] w-32 h-32 md:w-40 md:h-40 text-[#A58BFF]/30 rotate-45" />
                <Squiggle3 className="bg-squiggle absolute bottom-[35%] right-[-4%] md:right-[4%] w-36 h-36 md:w-48 md:h-48 text-[#A58BFF]/45 rotate-90" />
            </div>

            <div ref={textRef} className="max-w-[1200px] w-full flex flex-col items-center relative z-10">
                <div className="mb-12">
                    <span className="inline-block px-6 py-2 rounded-full bg-accent-violet text-dark-bg font-body text-[10px] sm:text-xs font-bold tracking-[4px] uppercase shadow-[0_4px_12px_rgba(161,153,255,0.3)] border border-transparent dark:bg-accent-violet/10 dark:backdrop-blur-md dark:border-accent-violet dark:text-accent-violet dark:shadow-none">
                        Philosophy
                    </span>
                </div>

                <h2 className="font-display text-[clamp(40px,8vw,120px)] uppercase leading-[0.9] tracking-[-1px] sm:tracking-[-4px] perspective-[1000px] text-center text-primary-text">
                    <div className="flex flex-wrap justify-center overflow-hidden">
                        <CharReveal charClass="manifesto-char">Design </CharReveal>
                        <CharReveal charClass="manifesto-char">that </CharReveal>
                        <CharReveal charClass="manifesto-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">breathes,</CharReveal>
                    </div>
                    <div className="flex flex-wrap justify-center overflow-hidden mt-2 sm:mt-4">
                        <CharReveal charClass="manifesto-char">experiences </CharReveal>
                        <CharReveal charClass="manifesto-char">that </CharReveal>
                        <CharReveal charClass="manifesto-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">matter.</CharReveal>
                    </div>
                </h2>

                <div className="manifesto-desc max-w-2xl mt-12 sm:mt-16 text-center">
                    <p className="font-body text-base sm:text-lg md:text-xl text-primary-text/60 leading-relaxed font-light">
                        Design is the invisible bridge between humanity and technology.
                        A strategic ecosystem of intentional moments designed to inspire
                        trust and drive meaningful action.
                    </p>
                </div>

                {/* Bulky Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-20 sm:mt-24 w-full">
                    {pillars.map((pillar, i) => {
                        const Squiggle = [
                            ({ className }) => (
                                <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 50 C 30 10, 40 10, 50 50 C 60 10, 70 10, 90 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ),
                            ({ className }) => (
                                <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 95 C 10 70, 40 40, 70 50 C 100 60, 90 90, 70 95 C 50 100, 40 80, 55 65 C 70 50, 85 65, 80 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ),
                            ({ className }) => (
                                <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M95 25 C 110 50, 80 80, 50 70 C 20 60, 30 30, 50 25 C 70 20, 80 40, 65 55 C 50 70, 35 55, 40 40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                        ][i];

                        return (
                            <div key={i} className="pillar-item group relative p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] bg-[#EBE6DA] dark:bg-dark-text/5 border border-[#A58BFF]/30 hover:border-[#A58BFF] hover:shadow-[0_8px_32px_rgba(165,139,255,0.15)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden flex flex-col justify-between min-h-[240px] sm:min-h-[320px] md:min-h-[360px] hover:-translate-y-2 cursor-default w-full max-w-[280px] sm:max-w-none mx-auto">
                                
                                {/* Animated circle/arrow in top right */}
                                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 sm:w-14 sm:h-14 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center text-[#A58BFF] border border-[#A58BFF]/30 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bg-[#A58BFF] group-hover:text-white group-hover:scale-110 group-hover:border-[#A58BFF] z-20">
                                    <svg className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -rotate-45 group-hover:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>

                                <div className="relative z-10 flex-1 flex flex-col">
                                    <span className="font-display text-4xl sm:text-6xl md:text-7xl text-[#A58BFF] mb-auto block font-bold tracking-tighter transition-transform duration-500 group-hover:translate-x-2">0{i + 1}</span>
                                    
                                    <div className="mt-4 sm:mt-12">
                                        <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight mb-2 sm:mb-4 text-primary-text group-hover:text-[#A58BFF] transition-all duration-500 group-hover:translate-x-2">
                                            {pillar.title}
                                        </h3>
                                        <p className="font-body text-[10px] sm:text-sm uppercase tracking-[2px] text-primary-text/60 font-semibold leading-relaxed max-w-[90%] transition-all duration-500 group-hover:translate-x-2">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Squiggle graphic */}
                                <Squiggle className="absolute bottom-[-10%] right-[-10%] w-32 h-32 sm:w-64 sm:h-64 text-[#A58BFF] opacity-10 md:opacity-5 group-hover:opacity-40 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-rotate-12 group-hover:scale-110 z-0 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>

                <div className="w-24 h-[1px] bg-accent-violet/30 mt-20 sm:mt-24" />
            </div>
        </section>
    );
};

export default ProjectManifesto;
