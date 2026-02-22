import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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
                <TextWrapper className="font-serif italic lowercase tracking-[1px] text-accent-violet font-normal">brand</TextWrapper>{' '}
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

            {/* Relocated Services Stack (Commented out as requested) */}
            {/*
            <div
                ref={stackRef}
                onMouseEnter={() => setIsHoveringStack(true)}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-[280px] sm:max-w-[300px] xl:max-w-[320px] z-20 perspective-[1000px] mx-auto"
            >
                <div className="relative w-full h-[300px] sm:h-[320px] xl:h-[350px] cursor-pointer">

                    <div
                        className={`absolute top-0 left-0 w-full backdrop-blur-2xl bg-[#F8F6F4]/95 border border-primary-text/10 p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-lg transition-all duration-[800ms] ease-custom origin-bottom
                            ${activeCard === 2 ? 'translate-y-0 scale-100 rotate-0 opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.06)]' :
                                isHoveringStack ? (activeCard < 2 ? 'translate-y-4 scale-95 opacity-50 z-10' : '-translate-y-8 scale-105 opacity-0 z-40') :
                                    'translate-y-0 scale-100 opacity-0 z-10'}
                        `}
                    >
                        <p className="text-[9px] sm:text-[10px] font-bold tracking-[3px] sm:tracking-[4px] uppercase mb-3 sm:mb-4 text-accent-violet border-b border-primary-text/10 pb-3 flex justify-between items-center">
                            <span>Toolkit</span>
                            <span className="text-primary-text/30 font-display text-base sm:text-lg">03</span>
                        </p>
                        <ul className="flex flex-col gap-2 sm:gap-3 font-body text-[12px] sm:text-[13px] font-medium tracking-[0.5px]">
                            <li>Figma & FigJam</li>
                            <li>Framer & Webflow</li>
                            <li>React & Tailwind CSS</li>
                            <li>Adobe Creative Suite</li>
                        </ul>
                    </div>

                    <div
                        className={`absolute top-0 left-0 w-full backdrop-blur-2xl bg-[#F8F6F4]/95 border border-primary-text/10 p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-xl transition-all duration-[800ms] ease-custom origin-bottom
                            ${activeCard === 1 ? 'translate-y-0 scale-100 rotate-0 opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.06)]' :
                                isHoveringStack ? (activeCard < 1 ? 'translate-y-2 scale-95 opacity-80 z-20' : '-translate-y-8 scale-105 opacity-0 z-40') :
                                    'translate-y-0 scale-100 opacity-0 z-20'}
                        `}
                    >
                        <p className="text-[9px] sm:text-[10px] font-bold tracking-[3px] sm:tracking-[4px] uppercase mb-3 sm:mb-4 text-accent-violet border-b border-primary-text/10 pb-3 flex justify-between items-center">
                            <span>Capabilities</span>
                            <span className="text-primary-text/30 font-display text-base sm:text-lg">02</span>
                        </p>
                        <ul className="flex flex-col gap-2 sm:gap-3 font-body text-[12px] sm:text-[13px] font-medium tracking-[0.5px]">
                            <li>Product Design</li>
                            <li>Design Systems</li>
                            <li>Wireframing & Prototyping</li>
                            <li>Visual & Interaction Design</li>
                        </ul>
                    </div>

                    <div
                        className={`absolute top-0 left-0 w-full backdrop-blur-2xl bg-[#F8F6F4]/90 border border-primary-text/5 p-6 sm:p-8 rounded-[20px] sm:rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-[800ms] ease-custom origin-bottom
                            ${activeCard === 0 ? 'translate-y-0 scale-100 rotate-0 opacity-100 z-30 shadow-[0_20px_40px_rgba(0,0,0,0.06)]' :
                                '-translate-y-8 scale-105 opacity-0 z-40'}
                        `}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-violet/20 via-primary-text/20 to-accent-violet/20"></div>

                        <p className="text-[9px] sm:text-[10px] font-bold tracking-[3px] sm:tracking-[4px] uppercase mb-4 sm:mb-6 text-accent-violet border-b border-primary-text/10 pb-3 flex justify-between items-center">
                            <span>Core Focus</span>
                            <span className="text-primary-text/30 font-display text-base sm:text-lg">01</span>
                        </p>

                        <ul className="flex flex-col gap-3 sm:gap-4 font-body text-[12px] sm:text-[13px] md:text-[14px] font-medium tracking-[0.5px]">
                            <li className="flex items-start gap-3 sm:gap-4">
                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                                <span className="flex-1 text-primary-text">User Experience & Interface</span>
                            </li>
                            <li className="flex items-start gap-3 sm:gap-4">
                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                                <span className="flex-1 text-primary-text">Brand Strategy & Identity</span>
                            </li>
                            <li className="flex items-start gap-3 sm:gap-4">
                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                                <span className="flex-1 text-primary-text">Scalable Design Systems</span>
                            </li>
                        </ul>

                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-primary-text/5 text-center">
                            <span className="text-[8px] sm:text-[9px] font-bold tracking-[2px] uppercase text-primary-text/40 transition-colors">
                                {isHoveringStack ? "Scroll to navigate" : "Hover to expand"}
                            </span>
                        </div>
                    </div>

                    <div className={`absolute -right-5 sm:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 sm:gap-2 transition-opacity duration-300 ${isHoveringStack ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${activeCard === 0 ? 'h-3 sm:h-4 bg-accent-violet' : 'h-1 sm:h-1.5 bg-primary-text/20'}`}></div>
                        <div className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${activeCard === 1 ? 'h-3 sm:h-4 bg-accent-violet' : 'h-1 sm:h-1.5 bg-primary-text/20'}`}></div>
                        <div className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${activeCard === 2 ? 'h-3 sm:h-4 bg-accent-violet' : 'h-1 sm:h-1.5 bg-primary-text/20'}`}></div>
                    </div>

                </div>
            </div>
            */}

        </section>
    );
};

export default About;
