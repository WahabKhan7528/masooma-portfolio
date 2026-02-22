import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Discovery',
        tag: 'Research & Empathy',
        desc: 'Understanding the core problem, business goals, and the target audience through in-depth research and strategic alignment.',
    },
    {
        num: '02',
        title: 'Strategy',
        tag: 'Planning & Architecture',
        desc: 'Defining the creative direction, mapping user journeys, and structuring the information architecture for seamless experiences.',
    },
    {
        num: '03',
        title: 'Design',
        tag: 'Craft & Iteration',
        desc: 'Crafting visually stunning, accessible, and intuitive interfaces with a scalable design system at its foundation.',
    },
    {
        num: '04',
        title: 'Delivery',
        tag: 'Handoff & Collaboration',
        desc: 'Collaborating closely with developers to ensure pixel-perfect implementation and a smooth product handoff.',
    },
];

const Process = () => {
    const container = useRef(null);
    const [activeStep, setActiveStep] = useState(null);

    useGSAP(() => {
        // Heading chars split & stagger in
        gsap.from('.process-title', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.process-title',
                start: 'top 88%',
            }
        });

        // Subtitle fade
        gsap.from('.process-sub', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.process-title',
                start: 'top 88%',
            }
        });

        // Cards stagger from bottom with rotation
        gsap.from('.process-card', {
            y: 80,
            opacity: 0,
            rotateX: 8,
            transformOrigin: 'top center',
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.process-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        // Accent line draws for each card border
        gsap.from('.process-bar', {
            scaleX: 0,
            transformOrigin: 'left center',
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: '.process-grid',
                start: 'top 75%',
            }
        });

        // Large background numbers parallax float
        gsap.to('.process-bg-num', {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            id="process"
            className="px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 relative z-20 w-full max-w-7xl mx-auto bg-dark-bg text-dark-text mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden"
        >
            {/* Background Decorative Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent-violet/5 blur-[100px] pointer-events-none" />

            {/* Section Header */}
            <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="overflow-hidden">
                    <h2 className="process-title font-display text-[clamp(36px,9vw,100px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px]">
                        <span className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">My </span>
                        Process
                    </h2>
                </div>
                <p className="process-sub font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-dark-text/40 font-semibold sm:mb-3 max-w-xs">
                    How I bring ideas to life, step by step
                </p>
            </div>

            {/* Cards Grid */}
            <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {steps.map((step, i) => (
                    <div
                        key={step.num}
                        className="process-card relative flex flex-col p-6 sm:p-8 bg-dark-bg cursor-default transition-colors duration-500 group hover:bg-white/[0.03]"
                        onMouseEnter={() => setActiveStep(i)}
                        onMouseLeave={() => setActiveStep(null)}
                    >
                        {/* Animated Top Border */}
                        <div className={`process-bar absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500 ${activeStep === i ? 'bg-accent-violet' : 'bg-white/10'}`} />

                        {/* Background Number */}
                        <div className="process-bg-num absolute bottom-4 right-4 font-display text-[80px] sm:text-[90px] lg:text-[110px] leading-none select-none pointer-events-none transition-all duration-700 opacity-[0.04] group-hover:opacity-[0.08] group-hover:text-accent-violet">
                            {step.num}
                        </div>

                        {/* Index Tag */}
                        <div className="flex items-center justify-between mb-8 sm:mb-12">
                            <span className={`font-body text-[10px] font-bold tracking-[3px] uppercase transition-colors duration-300 ${activeStep === i ? 'text-accent-violet' : 'text-dark-text/40'}`}>
                                {step.num}
                            </span>
                            <span className={`font-body text-[9px] font-semibold tracking-[2px] uppercase px-2.5 py-1 rounded-full border transition-all duration-300 ${activeStep === i
                                    ? 'border-accent-violet text-accent-violet'
                                    : 'border-white/10 text-dark-text/30'
                                }`}>
                                {step.tag}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-display text-3xl sm:text-4xl uppercase tracking-[-0.5px] mb-4 leading-none transition-colors duration-300 ${activeStep === i ? 'text-accent-violet' : 'text-dark-text'}`}>
                            {step.title}
                        </h3>

                        {/* Description */}
                        <p className="font-body text-xs sm:text-sm leading-relaxed text-dark-text/50 group-hover:text-dark-text/70 transition-colors duration-500 mt-auto">
                            {step.desc}
                        </p>

                        {/* Arrow indicator */}
                        <div className={`mt-6 sm:mt-8 flex items-center gap-2 transition-all duration-300 ${activeStep === i ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-1'}`}>
                            <div className="w-5 h-[1px] bg-accent-violet" />
                            <span className="font-body text-[9px] font-bold tracking-[2px] uppercase text-accent-violet">Step {step.num}</span>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Process;
