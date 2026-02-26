import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const jobs = [
    {
        index: '01',
        year: '2024 — Present',
        role: 'UX/UI Designer',
        company: 'Freelance',
        type: 'Full-Time',
        desc: 'Leading end-to-end product design for a range of clients — from early-stage startups to established brands — crafting intuitive interfaces, design systems, and visual identities that connect with real users.',
    },
    {
        index: '02',
        year: '2023 — 2024',
        role: 'Visual & Digital Designer',
        company: 'Studio Practice',
        type: 'Contract',
        desc: 'Designed responsive digital experiences and brand identities for tech-forward clients. Developed high-fidelity Figma prototypes and collaborated closely with developers to ensure pixel-perfect implementation.',
    },
    {
        index: '03',
        year: '2022 — 2023',
        role: 'UI/UX Intern',
        company: 'Design Agency',
        type: 'Internship',
        desc: 'Supported senior designers on web and app projects. Created wireframes, user flows, and contributed to design system documentation.',
    },
];

// Reusable character-split reveal component
const CharReveal = ({ children, className = '' }) => {
    const chars = children.split('');
    return (
        <span className={className}>
            {chars.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="exp-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

const Experience = () => {
    const container = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useGSAP(() => {
        // Character-split heading reveal
        gsap.from('.exp-char', {
            y: 100,
            opacity: 0,
            rotateX: -90,
            stagger: 0.03,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.exp-heading',
                start: 'top 88%',
            }
        });

        // Staggered row reveal
        gsap.from('.exp-row', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.exp-list',
                start: 'top 80%',
            }
        });

        // Animated violet divider line growing on scroll
        gsap.from('.exp-divider', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: '.exp-divider',
                start: 'top 85%',
            }
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            id="experience"
            className="px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 relative z-20 w-full max-w-6xl mx-auto"
        >
            {/* Section Header */}
            <div className="exp-heading flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-4">
                <h2 className="font-display text-[clamp(36px,9vw,100px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px] perspective-[1000px]">
                    <CharReveal className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Selected </CharReveal>
                    <CharReveal>Experience</CharReveal>
                </h2>
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-primary-text/40 font-semibold sm:mb-3">
                    {jobs.length} Roles
                </p>
            </div>

            {/* Animated Divider */}
            <div className="exp-divider w-full h-[1px] bg-primary-text/20 mb-12 sm:mb-16" />

            {/* Experience List */}
            <div className="exp-list flex flex-col">
                {jobs.map((job, i) => (
                    <div
                        key={job.index}
                        className="exp-row group relative"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Main Row */}
                        <div className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-8 sm:py-10 border-b border-primary-text/10 cursor-default transition-all duration-300 ${hoveredIndex === i ? 'pl-4 sm:pl-6' : 'pl-0'}`}>

                            {/* Index */}
                            <span className={`font-body text-[10px] font-bold tracking-[3px] uppercase transition-colors duration-300 md:w-16 flex-shrink-0 ${hoveredIndex === i ? 'text-accent-violet' : 'text-primary-text/90'}`}>
                                {job.index}
                            </span>

                            {/* Role & Company */}
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 md:gap-8">
                                <h3 className={`font-display text-[clamp(24px,4vw,52px)] uppercase leading-none tracking-[-0.5px] transition-colors duration-300 ${hoveredIndex === i ? 'text-accent-violet' : 'text-primary-text'}`}>
                                    {job.role}
                                </h3>
                                <span className="font-serif italic text-base sm:text-lg text-primary-text/60">
                                    {job.company}
                                </span>
                            </div>

                            {/* Year & Type */}
                            <div className="flex items-center gap-4 md:gap-6 md:flex-col md:items-end">
                                <span className="font-body text-[10px] sm:text-xs font-semibold tracking-[2px] uppercase text-primary-text/80">
                                    {job.year}
                                </span>
                                <span className={`font-body text-[9px] sm:text-[10px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border transition-all duration-300 ${hoveredIndex === i
                                    ? 'border-accent-violet text-accent-violet'
                                    : 'border-primary-text/20 text-primary-text/60'
                                    }`}>
                                    {job.type}
                                </span>
                            </div>
                        </div>

                        {/* Expandable Description on hover */}
                        <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredIndex === i ? 'max-h-40 opacity-100 py-4 sm:py-6' : 'max-h-0 opacity-0 py-0'}`}>
                            <p className="font-body text-xs sm:text-sm md:text-base text-primary-text/60 leading-relaxed max-w-2xl pl-0 md:pl-16">
                                {job.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
