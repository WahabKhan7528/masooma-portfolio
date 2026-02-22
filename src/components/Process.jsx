import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.process-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse'
            }
        });

        gsap.to('.process-num', {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }, { scope: container });

    const steps = [
        { num: '01', title: 'Discovery', desc: 'Understanding the core problem, business goals, and the target audience through in-depth research and strategic alignment.' },
        { num: '02', title: 'Strategy', desc: 'Defining the creative direction, mapping user journeys, and structuring the information architecture for seamless experiences.' },
        { num: '03', title: 'Design', desc: 'Crafting visually stunning, accessible, and intuitive interfaces with a scalable design system at its foundation.' },
        { num: '04', title: 'Delivery', desc: 'Collaborating closely with developers to ensure pixel-perfect implementation and smooth product handoff.' },
    ];

    return (
        <section ref={container} id="process" className="px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-32 relative z-20 w-full max-w-7xl mx-auto bg-dark-bg text-dark-text mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 rounded-[24px] sm:rounded-[32px] md:rounded-[40px]">

            <div className="mb-12 sm:mb-16 md:mb-24 text-center">
                <h2 className="font-display text-[clamp(28px,8vw,80px)] uppercase leading-[1] tracking-[-1px]">
                    <span className="font-serif italic lowercase tracking-[1px] font-normal text-accent-violet">My </span>
                    Process
                </h2>
                <p className="mt-4 sm:mt-6 font-body text-xs sm:text-sm md:text-base text-dark-text/60 uppercase tracking-[1px] sm:tracking-[2px] font-medium max-w-lg mx-auto">
                    How I bring ideas to life
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                {steps.map((step, index) => (
                    <div key={index} className="process-card relative flex flex-col pt-12 sm:pt-16 group">

                        {/* Huge Background Number with Parallax */}
                        <div className="process-num absolute top-0 left-0 font-display text-[80px] sm:text-[100px] lg:text-[120px] leading-none text-white/5 select-none -z-10 transition-colors duration-500 group-hover:text-accent-violet/10">
                            {step.num}
                        </div>

                        <div className="border-t border-white/20 pt-4 sm:pt-6 mt-2 sm:mt-4 transition-colors duration-500 group-hover:border-accent-violet">
                            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[1px] mb-3 sm:mb-4 text-white">
                                {step.title}
                            </h3>
                            <p className="font-body text-xs sm:text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-500">
                                {step.desc}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
};

export default Process;
