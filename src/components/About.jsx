import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

                // Animate using simple JS interval for reliable React state updates
                const duration = 2000;
                const frameRate = 1000 / 60;
                const totalFrames = Math.round(duration / frameRate);
                let frame = 0;

                const counter = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    // Ease out quad
                    const easeProgress = progress * (2 - progress);
                    const currentCount = Math.round(easeProgress * stat.number);

                    setCount(currentCount);

                    if (frame === totalFrames) {
                        clearInterval(counter);
                        setCount(stat.number);
                    }
                }, frameRate);
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
    // const stackRef = useRef(null);
    // const [activeCard, setActiveCard] = useState(0);
    // const [isHoveringStack, setIsHoveringStack] = useState(false);

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
    }, { scope: container });

    /*
    useEffect(() => {
        const stackEl = stackRef.current;
        if (!stackEl) return;

        const handleWheel = (e) => {
            if (!isHoveringStack) return;
            e.preventDefault();
            if (Math.abs(e.deltaY) < 20) return;

            if (e.deltaY > 0) {
                setActiveCard(prev => Math.min(prev + 1, 2));
            } else {
                setActiveCard(prev => Math.max(prev - 1, 0));
            }
        };

        stackEl.addEventListener('wheel', handleWheel, { passive: false });
        return () => stackEl.removeEventListener('wheel', handleWheel);
    }, [isHoveringStack]);

    const handleMouseLeave = () => {
        setIsHoveringStack(false);
        setActiveCard(0);
    };
    */

    const TextWrapper = ({ children, className = "" }) => (
        <span className={`inline-block overflow-hidden pb-1 sm:pb-2 ${className}`}>
            <span className="about-word inline-block origin-bottom">{children}</span>
        </span>
    );

    return (
        <section
            id="about"
            ref={container}
            className="px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center"
        >
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
                        items: ['Figma','Fig-jam','Canva'],
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

        </section>
    );
};

export default About;
