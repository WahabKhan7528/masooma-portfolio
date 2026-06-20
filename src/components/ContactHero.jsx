import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';
import { Squiggle1, Squiggle2, Squiggle3 } from './shared/Squiggles';

const ContactHero = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-char', {
            y: 120,
            opacity: 0,
            rotateX: -90,
            stagger: 0.02,
            duration: 1.4,
            ease: 'power4.out',
            delay: 0.3
        });

        gsap.from('.bg-squiggle', {
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30, true),
            duration: 1.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.5
        });
    }, { scope: container });

    return (
        <section ref={container} className="w-full pt-52 pb-40 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col items-center justify-center text-center bg-primary-bg relative overflow-hidden min-h-[70vh]">
            
            {/* Playful background squiggles */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <Squiggle1 className="bg-squiggle absolute top-[10%] left-[5%] w-32 h-32 text-[#A58BFF] rotate-45 opacity-70" />
                <Squiggle2 className="bg-squiggle absolute top-[15%] right-[5%] w-40 h-28 text-[#A58BFF] -rotate-12 opacity-80" />
                <Squiggle3 className="bg-squiggle absolute bottom-[10%] left-[5%] w-44 h-44 text-[#A58BFF] rotate-12 opacity-60" />
                <Squiggle1 className="bg-squiggle absolute bottom-[10%] right-[5%] w-36 h-36 text-[#A58BFF] rotate-90 opacity-75" />
                <Squiggle2 className="bg-squiggle absolute top-[50%] left-[-2%] w-24 h-16 text-[#A58BFF] rotate-180 opacity-40" />
                <Squiggle3 className="bg-squiggle absolute top-[60%] right-[-2%] w-32 h-32 text-[#A58BFF] rotate-45 opacity-50" />
            </div>

            <p className="hero-subtitle font-body text-sm sm:text-base uppercase tracking-[5px] text-[#A58BFF] mb-8 font-bold z-10 relative">
                Let's create something together
            </p>
            <h1 className="font-display text-[clamp(40px,10vw,160px)] uppercase leading-[1.1] tracking-[-3px] text-primary-text perspective-[1000px] max-w-[95vw] lg:max-w-[1400px] z-10 relative py-8 px-4">
                <CharReveal charClass="hero-char" className="block">Ready to start</CharReveal>
                <CharReveal charClass="hero-char" className="font-serif italic lowercase font-normal text-[#A58BFF] block">your next project?</CharReveal>
            </h1>
        </section>
    );
};

export default ContactHero;
