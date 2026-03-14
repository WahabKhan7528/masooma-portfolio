import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';

const BriefAbout = () => {
    const container = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        // Headline reveal
        gsap.from('.brief-char', {
            y: 50,
            opacity: 0,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
            }
        });

        // Highlights fade in
        gsap.from('.philosophy-item', {
            opacity: 0,
            x: -20,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.philosophy-list',
                start: 'top 85%',
            }
        });

        gsap.to(imageRef.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative px-4 sm:px-6 md:px-10 py-24 sm:py-32 overflow-hidden w-full bg-warm/10 dark:bg-dark-bg/20">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent-violet/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative z-10">
                
                {/* Visual Part - Left (Artistic Anchor) */}
                <div className="w-full lg:w-5/12 order-2 lg:order-1">
                    <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-[32px] sm:rounded-[40px] overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-violet/10 group-hover:bg-accent-violet/0 transition-colors duration-700 z-10" />
                        <img 
                            ref={imageRef}
                            src="/brief-about-art.png" 
                            alt="UX Design Philosophy Abstract" 
                            className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                        />
                        {/* Glassmorphism Badge */}
                        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 p-4 sm:p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl z-20 hidden xs:block max-w-[160px] sm:max-w-[200px]">
                            <p className="font-serif italic text-base sm:text-lg text-white/80 leading-snug">
                                Design that breathes, <br/> experiences that <span className="text-accent-violet">matter</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Part - Right (Narrative) */}
                <div className="w-full lg:w-7/12 order-1 lg:order-2 flex flex-col gap-8 sm:gap-10">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <span className="font-body text-[10px] sm:text-xs font-bold tracking-[3px] sm:tracking-[4px] uppercase text-accent-violet/60">
                            Introduction
                        </span>
                        <h2 className="font-display text-[clamp(28px,7vw,64px)] uppercase leading-[1.1] tracking-[-0.5px] sm:tracking-[-1px] text-primary-text perspective-[1000px]">
                            <CharReveal charClass="brief-char">Bridging </CharReveal>
                            <CharReveal charClass="brief-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Empathy </CharReveal>
                            <CharReveal charClass="brief-char">and </CharReveal>
                            <CharReveal charClass="brief-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Precision.</CharReveal>
                        </h2>
                    </div>

                    <p className="font-body text-base sm:text-lg lg:text-xl text-primary-text/60 leading-relaxed max-w-xl">
                        I believe that great design isn't just about how things look, but how they feel in the hands of the user. As a UX/UI designer, I craft digital ecosystems where every pixel serves a purpose and every interaction tells a story.
                    </p>

                    <div className="philosophy-list flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6 pt-4 border-t border-primary-text/10">
                        {['Empathy', 'Precision', 'Impact'].map((item) => (
                            <div key={item} className="philosophy-item flex items-center gap-2 sm:gap-3">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-violet shadow-[0_0_8px_rgba(161,153,255,0.4)] sm:shadow-[0_0_10px_rgba(161,153,255,0.5)]" />
                                <span className="font-display text-base sm:text-xl uppercase tracking-wider text-primary-text/80">{item}</span>
                            </div>
                        ))}
                    </div>

                    <Link 
                        to="/about" 
                        className="group flex items-center gap-6 mt-4 w-fit"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent-violet/20 rounded-full blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative w-14 h-14 rounded-full border border-accent-violet/30 group-hover:border-accent-violet flex items-center justify-center group-hover:bg-accent-violet group-hover:text-dark-bg transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-body text-[10px] font-bold tracking-[3px] uppercase text-accent-violet">
                                Explore
                            </span>
                            <span className="font-display text-xl uppercase tracking-wide text-primary-text group-hover:text-accent-violet transition-colors">
                                My Full Journey
                            </span>
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default BriefAbout;
