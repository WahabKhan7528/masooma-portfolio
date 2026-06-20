import { memo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// --- Background Squiggle SVGs ---
const Squiggle1 = ({ className }) => (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 95 C 10 70, 40 40, 70 50 C 100 60, 90 90, 70 95 C 50 100, 40 80, 55 65 C 70 50, 85 65, 80 80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Squiggle2 = ({ className }) => (
    <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 50 C 30 10, 40 10, 50 50 C 60 10, 70 10, 90 50" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Squiggle3 = ({ className }) => (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M95 25 C 110 50, 80 80, 50 70 C 20 60, 30 30, 50 25 C 70 20, 80 40, 65 55 C 50 70, 35 55, 40 40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SquiggleDivider = () => (
    <div className="footer-divider absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[30%] pointer-events-none origin-center">
        <svg className="w-full h-8 sm:h-12 text-[#A58BFF] opacity-80" viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 30 C 100 15, 200 45, 300 30 C 400 15, 500 20, 600 35 C 700 50, 800 20, 900 30 C 1000 40, 1100 15, 1200 30" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const Footer = memo(() => {
    const container = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (path.includes('#')) {
            const [route, hash] = path.split('#');
            const targetRoute = route || '/';
            if (location.pathname === targetRoute) {
                const target = document.getElementById(hash);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate(path);
                setTimeout(() => {
                    const target = document.getElementById(hash);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        } else {
            navigate(path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        gsap.from('.footer-divider', {
            opacity: 0,
            scaleX: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: container.current, start: 'top 95%' }
        });

        gsap.from('.ft-inner', {
            opacity: 0,
            y: 30,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: container.current, start: 'top 88%' }
        });

        gsap.from('.bg-squiggle', {
            opacity: 0,
            scale: 0.5,
            rotation: gsap.utils.random(-30, 30, true),
            duration: 1.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: container.current, start: 'top 75%' }
        });
    }, { scope: container });

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const HoverButton = ({ text, href }) => {
        return (
            <a href={href} onClick={(e) => handleNavigation(e, href)} className="group relative w-[85vw] sm:w-[24rem] md:w-[26rem] h-16 md:h-[4.5rem] bg-[#EBE6DA] dark:bg-dark-text/10 border border-[#A58BFF] rounded-full flex items-center px-2 md:px-3 overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="absolute left-2 md:left-3 w-12 h-12 md:w-14 md:h-14 bg-[#A58BFF] rounded-full flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:left-[calc(100%-3.5rem)] md:group-hover:left-[calc(100%-4.25rem)] z-10">
                    <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -rotate-45 group-hover:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <span className="w-full text-center font-body text-base md:text-lg font-bold text-primary-text transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-5 z-0">
                    {text}
                </span>
            </a>
        );
    };

    return (
        <footer
            ref={container}
            id="footer-section"
            className="min-h-[75vh] bg-primary-bg text-primary-text relative overflow-hidden flex flex-col justify-between pt-10"
        >
            <SquiggleDivider />
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <Squiggle1 className="bg-squiggle absolute top-[20%] left-[15%] w-28 h-28 text-[#A58BFF] rotate-45 opacity-70" />
                <Squiggle2 className="bg-squiggle absolute top-[8%] left-[35%] w-32 h-24 text-[#A58BFF] -rotate-12 opacity-80" />
                <Squiggle1 className="bg-squiggle absolute top-[55%] left-[8%] w-44 h-44 text-[#A58BFF] rotate-12" />
                <Squiggle2 className="bg-squiggle absolute top-[40%] left-[45%] w-40 h-28 text-[#A58BFF] -rotate-12" />
                <Squiggle3 className="bg-squiggle absolute top-[60%] right-[8%] w-48 h-48 text-[#A58BFF] rotate-45" />
                <Squiggle3 className="bg-squiggle absolute bottom-[30%] left-[35%] w-40 h-40 text-[#A58BFF] rotate-90 opacity-60" />
                <Squiggle1 className="bg-squiggle absolute bottom-[15%] right-[35%] w-32 h-32 text-[#A58BFF] -rotate-45 opacity-75" />
            </div>

            <div className="ft-inner flex-1 w-full mx-auto px-6 sm:px-10 py-10 flex flex-col justify-between relative z-10 h-full">

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between w-full mt-10 md:mt-0 gap-10 md:gap-4 relative z-20">

                    {/* Left: Quick Links */}
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 items-start w-full md:w-1/3 order-2 md:order-1 pt-10 md:pt-0">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Projects', path: '/projects' },
                            { name: 'About', path: '/about' },
                            { name: 'Experience', path: '/about#experience' }
                        ].map(link => (
                            <a key={link.name} href={link.path} onClick={(e) => handleNavigation(e, link.path)} className="group relative inline-block font-display font-normal hover:font-bold text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl text-primary-text uppercase tracking-tighter hover:text-[#A58BFF] transition-all duration-300">
                                {link.name}
                                <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-[#A58BFF] transition-all duration-500 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Right: Giant Text & Description */}
                    <div className="flex flex-col items-start md:items-end justify-center font-display text-primary-text w-full md:w-2/3 leading-[0.85] select-none order-1 md:order-2">
                        <span className="text-[8.5vw] sm:text-[9vw] md:text-[15vw] lg:text-[13vw] xl:text-[12.5vw] tracking-tighter whitespace-nowrap text-left md:text-right uppercase">
                            {"Craftoria".split("").map((char, index) => {
                                const isT = char.toLowerCase() === 't';
                                return (
                                    <span
                                        key={index}
                                        className={`inline-block transition-all duration-300 hover:-translate-y-2 transform cursor-default ${isT ? 'text-[#A58BFF] text-[1.25em]' : 'hover:text-[#A58BFF]'
                                            }`}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                        <p className="mt-6 md:mt-8 font-body text-sm sm:text-base md:text-lg text-primary-text/60 max-w-[280px] sm:max-w-xs md:max-w-md text-left md:text-right leading-relaxed font-medium">
                            I am Masooma Batool, a passionate UI/UX Designer dedicated to crafting intuitive, beautiful, and user-centric digital experiences that solve real-world problems.
                        </p>
                    </div>

                </div>

                {/* Bottom Bar Area */}
                <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 lg:gap-4 mt-20 mb-4">

                    {/* Left: Location & Name */}
                    <div className="flex flex-col gap-2 md:gap-4 items-center lg:items-start text-center lg:text-left order-3 lg:order-1">
                        <span className="font-body text-[10px] md:text-xs font-bold tracking-widest text-primary-text/80 uppercase">
                            Pakistan © 2026
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-none uppercase flex items-baseline">
                            <span className="text-[#A58BFF] mr-1 md:mr-2">Masooma</span>
                            <span className="text-primary-text">Batool</span>
                        </h2>
                    </div>

                    {/* Middle: CTA Buttons */}
                    <div className="flex flex-col gap-3 order-1 lg:order-2">
                        <HoverButton text="Let's Connect" href="/contact#contact" />
                        <HoverButton text="View My Work" href="/projects" />
                    </div>

                    {/* Right: Back to top */}
                    <div className="order-2 lg:order-3">
                        <button onClick={scrollToTop} className="group flex flex-col items-center cursor-pointer border-none bg-transparent outline-none">
                            <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-20 text-[#A58BFF] mb-2 transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-105">
                                <path d="M50 15 C 50 60, 90 60, 80 90 C 70 120, 20 100, 30 70 C 40 40, 50 50, 50 50" />
                                <path d="M50 15 L35 30 M50 15 L65 30" />
                            </svg>
                            <span className="font-display text-xl md:text-2xl font-bold leading-[0.9] text-center text-[#1C1C1D] dark:text-primary-text uppercase">
                                Back<br />To Top
                            </span>
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;
