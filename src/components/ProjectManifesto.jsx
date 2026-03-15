import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';

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
        }, "-=0.3");

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
            className="w-full min-h-[70vh] flex items-center justify-center px-4 sm:px-6 md:px-10 pt-16 pb-4 sm:pt-32 sm:pb-8"
        >
            <div ref={textRef} className="max-w-[1200px] w-full flex flex-col items-center">
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
                    {pillars.map((pillar, i) => (
                        <div key={i} className="pillar-item group relative p-8 sm:p-10 rounded-[32px] bg-primary-text/[0.03] border border-primary-text/[0.08] hover:border-accent-violet/40 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/5 blur-3xl rounded-full translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative z-10">
                                <span className="font-display text-sm text-accent-violet/50 mb-6 block">0{i + 1}</span>
                                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider mb-4 text-primary-text group-hover:text-accent-violet transition-colors duration-300">
                                    {pillar.title}
                                </h3>
                                <p className="font-body text-xs sm:text-sm uppercase tracking-[2px] text-primary-text/40 font-semibold leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-24 h-[1px] bg-accent-violet/30 mt-20 sm:mt-24" />
            </div>
        </section>
    );
};

export default ProjectManifesto;
