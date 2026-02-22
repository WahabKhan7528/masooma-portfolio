import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text-anim', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.2
        })
            .from('.hero-subtitle', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power2.out'
            }, "-=0.8");

    }, { scope: container });

    return (
        <section ref={container} id="hero" className="relative min-h-[100vh] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-[120%] pointer-events-none flex justify-center items-center opacity-5 overflow-hidden">
                <div className="w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] border-[1px] border-primary-text rounded-full absolute mix-blend-overlay"></div>
                <div className="w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] border-[2px] border-primary-text rounded-full absolute mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center mt-[-2vh] sm:mt-[-5vh]">

                <h1 className="font-display uppercase leading-[0.85] tracking-[-1px] sm:tracking-[-2px] flex flex-col items-center select-none overflow-hidden">
                    <div className="overflow-hidden">
                        <span className="hero-text-anim block text-[clamp(44px,14vw,280px)] text-primary-text leading-[0.8]">
                            UX/UI
                        </span>
                    </div>
                    <div className="overflow-hidden z-10 -mt-1 sm:-mt-2 md:-mt-8">
                        <span className="hero-text-anim block font-serif italic font-normal text-[clamp(36px,11vw,180px)] text-accent-violet lowercase tracking-[1px] sm:tracking-[2px]">
                            brand
                        </span>
                    </div>
                    <div className="overflow-hidden -mt-1 sm:-mt-2 md:-mt-10">
                        <span className="hero-text-anim block text-[clamp(44px,14vw,280px)] text-primary-text leading-[0.85]">
                            Designer
                        </span>
                    </div>
                </h1>

                <p className="hero-subtitle mt-6 sm:mt-8 md:mt-12 max-w-lg font-body text-[9px] sm:text-[10px] md:text-sm text-primary-text/70 uppercase tracking-[2px] sm:tracking-[3px] font-semibold">
                    Crafting digital experiences <br className="hidden md:block" /> & visual identities
                </p>

            </div>
        </section>
    );
};

export default Hero;
