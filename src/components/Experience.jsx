import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.exp-line', {
            height: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            }
        });

        gsap.utils.toArray('.exp-item').forEach((item) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse'
                }
            });
        });
    }, { scope: container });

    const jobs = [
        { year: '2023 — Present', role: 'Senior UX/UI Designer', company: 'Digital Nexus Inc.', desc: 'Leading product design for enterprise web applications, defining robust design systems and leading usability testing across global markets.' },
        { year: '2021 — 2023', role: 'Brand & Digital Designer', company: 'Studio Elevate', desc: 'Crafted comprehensive digital identities and responsive websites for tech startups and cultural institutions.' },
        { year: '2019 — 2021', role: 'Interactive Designer', company: 'Creative Labs', desc: 'Designed high-conversion landing pages and interactive marketing campaigns.' },
    ];

    return (
        <section ref={container} id="experience" className="px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-32 relative z-20 w-full max-w-5xl mx-auto">

            <div className="mb-12 sm:mb-16 md:mb-20 text-center flex flex-col items-center">
                <h2 className="font-display text-[clamp(32px,8vw,80px)] uppercase leading-[1] tracking-[-1px]">
                    <span className="font-serif italic lowercase tracking-[1px] font-normal text-accent-violet">Selected </span>
                    Experience
                </h2>
            </div>

            <div className="relative pl-6 sm:pl-4 md:pl-0">

                {/* Timeline Desktop Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary-text/10 -translate-x-1/2">
                    <div className="exp-line absolute top-0 left-0 w-full bg-accent-violet"></div>
                </div>
                {/* Timeline Mobile Line */}
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-[1px] bg-primary-text/10">
                    <div className="exp-line absolute top-0 left-0 w-full bg-accent-violet"></div>
                </div>

                <div className="flex flex-col gap-12 sm:gap-16 md:gap-24">
                    {jobs.map((job, index) => (
                        <div key={index} className={`exp-item relative w-full flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Dot */}
                            <div className="absolute left-[-4px] md:left-1/2 top-1 sm:top-2 w-2 h-2 sm:w-3 sm:h-3 bg-primary-bg border-2 border-accent-violet rounded-full z-10 md:-translate-x-1/2"></div>

                            <div className={`w-full md:w-1/2 flex flex-col ${index % 2 === 0 ? 'md:pl-12 lg:pl-24' : 'md:pr-12 lg:pr-24 md:items-end md:text-right'}`}>
                                <span className="font-body text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[2px] sm:tracking-[3px] text-accent-violet mb-2 sm:mb-3">
                                    {job.year}
                                </span>
                                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-[1px] mb-1 sm:mb-2 leading-none">
                                    {job.role}
                                </h3>
                                <h4 className="font-serif italic text-base sm:text-lg md:text-xl text-primary-text/60 mb-3 sm:mb-4">
                                    {job.company}
                                </h4>
                                <p className="font-body text-xs sm:text-sm md:text-base leading-relaxed text-primary-text/80 max-w-sm">
                                    {job.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default Experience;
