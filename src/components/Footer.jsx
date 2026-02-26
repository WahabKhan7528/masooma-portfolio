import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.ft-inner', {
            opacity: 0,
            y: 30,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: container.current, start: 'top 88%' }
        });
        gsap.from('.ft-stat', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.ft-stats', start: 'top 92%' }
        });
    }, { scope: container });

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer
            ref={container}
            id="footer-section"
            className="h-screen bg-dark-bg text-dark-text relative overflow-hidden flex flex-col"
        >
            {/* Violet gradient top accent */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent-violet to-transparent" />

            <div className="ft-inner flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center justify-between gap-6">

                {/* ── Availability badge ── */}
                <div className="flex items-center gap-2 bg-dark-text/5 border border-dark-text/10 rounded-full px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="font-body text-[10px] font-bold tracking-[3px] uppercase text-dark-text/60">
                        Available for freelance work
                    </span>
                </div>

                {/* ── Section label ── */}
                <div className="flex flex-col gap-3 items-center">
                    <p className="font-body text-[10px] font-bold tracking-[4px] uppercase text-accent-violet">
                        Get In Touch
                    </p>
                    <h2 className="font-display text-[clamp(28px,6vw,72px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px]">
                        Have a project in mind?
                    </h2>
                    <p className="font-body text-sm text-dark-text/40">
                        I'm always open to discussing new projects, creative ideas, or opportunities.
                    </p>
                </div>

                {/* ── Giant email pill CTA ── */}
                <a
                    href="mailto:masooma0225@gmail.com"
                    className="group relative inline-flex items-center justify-center gap-4 border border-dark-text/15 hover:border-accent-violet text-dark-text hover:text-accent-violet rounded-full px-8 sm:px-12 py-5 sm:py-6 transition-all duration-500"
                >
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-accent-violet/5 blur-sm" />
                    <span className="font-display text-lg sm:text-2xl md:text-3xl  tracking-[-0.5px] relative z-10">
                        masooma0225@gmail.com
                    </span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </a>

                {/* ── Stats row ── */}
                <div className="ft-stats w-full grid grid-cols-3 gap-4 border border-dark-text/8 rounded-2xl p-6 sm:p-8">
                    {[
                        { num: '1+', label: 'Years Experience' },
                        { num: '10+', label: 'Projects Delivered' },
                        { num: '3+', label: 'Tools Mastered' },
                    ].map(stat => (
                        <div key={stat.label} className="ft-stat flex flex-col items-center gap-1">
                            <span className="font-display text-[clamp(24px,5vw,56px)] font-bold text-accent-violet leading-none">
                                {stat.num}
                            </span>
                            <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-[2px] text-dark-text/30 font-semibold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Socials + Nav ── */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-dark-text/25">Socials</p>
                        <div className="flex items-center gap-6">
                            <a href="https://www.linkedin.com/in/masooma-batool-b9b679387" target="_blank" rel="noopener noreferrer"
                                        className="group relative font-body text-[10px] font-bold tracking-[2px] uppercase text-dark-text/40 hover:text-accent-violet transition-colors duration-300">
                                        LinkedIn
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-violet transition-all duration-300 group-hover:w-full" />
                                    </a>
                                    <a href="https://www.instagram.com/craf_to_ria/" target="_blank" rel="noopener noreferrer"
                                        className="group relative font-body text-[10px] font-bold tracking-[2px] uppercase text-dark-text/40 hover:text-accent-violet transition-colors duration-300">
                                        Instagram
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-violet transition-all duration-300 group-hover:w-full" />
                                    </a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-2">
                        <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-dark-text/25">Navigate</p>
                        <div className="flex items-center gap-6">
                            {['Home', 'Projects', 'About', 'Experience'].map(link => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="group relative font-body text-[10px] sm:text-xs font-bold tracking-[3px] uppercase text-dark-text/40 hover:text-accent-violet transition-colors duration-300"
                                >
                                    {link}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-violet transition-all duration-400 group-hover:w-full" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="w-full border-t border-dark-text/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="font-body text-[10px] tracking-[2px] uppercase text-dark-text/20">
                        © 2026 Masooma Batool. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 font-body text-[10px] tracking-[2px] uppercase text-dark-text/20 hover:text-accent-violet transition-colors duration-300 bg-transparent border-none cursor-pointer"
                    >
                        Back to Top
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
                    </button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
