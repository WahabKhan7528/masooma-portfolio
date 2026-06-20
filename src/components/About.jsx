import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Squiggle1, Squiggle2, Squiggle3 } from './shared/Squiggles';

const CountUpStat = ({ stat }) => {
    const [count, setCount] = useState(0);
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 90%',
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;

                // Animate using requestAnimationFrame for smooth, display-synced updates
                const duration = 2000;
                let startTime = null;

                const step = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quad
                    const easeProgress = progress * (2 - progress);
                    setCount(Math.round(easeProgress * stat.number));

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        setCount(stat.number);
                    }
                };

                requestAnimationFrame(step);
            }
        });
        return () => trigger.kill();
    }, [stat.number]);

    return (
        <div ref={containerRef} className="flex flex-col items-center text-center gap-2">
            <span className="font-display text-[clamp(36px,6vw,72px)] font-bold text-accent-violet leading-none tabular-nums">
                {count}{stat.suffix}
            </span>
            <span className="font-body text-[10px] sm:text-xs uppercase tracking-[2px] text-primary-text/50 font-semibold">
                {stat.label}
            </span>
        </div>
    );
};

const About = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.about-word', {
            opacity: 0,
            y: 40,
            rotationX: -45,
            stagger: 0.05,
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
                trigger: container.current,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
            }
        });

        gsap.from('.bg-squiggle', {
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30, true),
            duration: 1.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: container.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: container });

    const TextWrapper = ({ children, className = "" }) => (
        <span className={`inline-block overflow-hidden pb-1 sm:pb-2 ${className}`}>
            <span className="about-word inline-block origin-bottom">{children}</span>
        </span>
    );

    return (
        <section
            id="about"
            ref={container}
            className="w-full relative overflow-hidden py-16 sm:py-24 md:py-32 z-20"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <Squiggle1 className="bg-squiggle absolute top-[12%] left-[-4%] md:left-[2%] w-24 h-24 md:w-32 md:h-32 text-[#A58BFF]/40 rotate-12" />
                <Squiggle3 className="bg-squiggle absolute top-[8%] right-[-6%] md:right-[3%] w-28 h-28 md:w-36 md:h-36 text-[#A58BFF]/30 rotate-45" />
                <Squiggle2 className="bg-squiggle absolute bottom-[15%] left-[-2%] md:left-[4%] w-32 h-20 md:w-40 md:h-28 text-[#A58BFF]/30 -rotate-12" />
                <Squiggle1 className="bg-squiggle absolute bottom-[35%] right-[-5%] md:right-[2%] w-36 h-36 md:w-44 md:h-44 text-[#A58BFF]/40 rotate-90" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center">
                <div className="mb-12 text-center">
                    <span className="inline-block px-6 py-2 rounded-full bg-accent-violet text-dark-bg font-body text-[10px] sm:text-xs font-bold tracking-[4px] uppercase shadow-[0_4px_12px_rgba(161,153,255,0.3)] border border-transparent dark:bg-accent-violet/10 dark:backdrop-blur-md dark:border-accent-violet dark:text-accent-violet dark:shadow-none">
                        Intro
                    </span>
                </div>
                <div className="max-w-5xl w-full font-display text-[clamp(20px,5vw,52px)] uppercase tracking-[0.5px] sm:tracking-[1px] leading-[1.3] sm:leading-[1.4] text-center text-primary-text perspective-[1000px] mb-16 md:mb-24">
                    <TextWrapper>Hey.</TextWrapper>{' '}
                    <TextWrapper>I'm</TextWrapper>{' '}
                    <TextWrapper>Masooma.</TextWrapper>{' '}
                    <TextWrapper>A</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">UX/UI</TextWrapper>{' '}
                    <TextWrapper>and</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">web</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">designer</TextWrapper>{' '}
                    <br className="hidden md:block" />
                    <TextWrapper>I'm</TextWrapper>{' '}
                    <TextWrapper>living</TextWrapper>{' '}
                    <TextWrapper>the</TextWrapper>{' '}
                    <TextWrapper>wonderfully</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">interesting</TextWrapper>{' '}
                    <TextWrapper>life</TextWrapper>{' '}
                    <TextWrapper>of</TextWrapper>{' '}
                    <TextWrapper>a</TextWrapper>{' '}
                    <TextWrapper>designer.</TextWrapper>{' '}
                    <br className="hidden md:block" />
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">Driven</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">by</TextWrapper>{' '}
                    <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">curiosity.</TextWrapper>{' '}
                </div>

                {/* Stats Row */}
                <div className="stats-row w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 border-t border-primary-text/10 pt-12 sm:pt-16 mb-16 sm:mb-24">
                    {[
                        { number: 1, suffix: '+', label: 'Years of Experience' },
                        { number: 10, suffix: '+', label: 'Projects Completed' },
                        { number: 10, suffix: '+', label: 'Happy Clients' },
                        { number: 3, suffix: '+', label: 'Design Tools Mastered' },
                    ].map((stat) => (
                        <CountUpStat key={stat.label} stat={stat} />
                    ))}
                </div>

                {/* Skills & Tools Grid */}
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary-text/10 border border-primary-text/10 rounded-2xl overflow-hidden">
                    {[
                        {
                            title: 'Core Focus',
                            items: ['UX Research', 'Interface Design', 'Brand Identity', 'Design Systems'],
                        },
                        {
                            title: 'Capabilities',
                            items: ['Wireframing', 'Prototyping', 'Visual Design', 'Interaction Design'],
                        },
                        {
                            title: 'Toolkit',
                            items: ['Figma', 'Fig-jam', 'Canva'],
                        },
                    ].map((col, i) => (
                        <div key={col.title} className="bg-dark-bg p-6 sm:p-8 flex flex-col gap-4">
                            <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-accent-violet border-b border-dark-text/10 pb-3">
                                {col.title}
                            </p>
                            <ul className="flex flex-col gap-3">
                                {col.items.map((item) => (
                                    <li key={item} className="font-body text-xs sm:text-sm text-dark-text flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-violet flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
