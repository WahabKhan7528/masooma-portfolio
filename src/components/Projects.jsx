import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';

const projectsData = [
    {
        id: 1,
        index: '01',
        title: 'Elan Dance Studio',
        category: 'Web Design ',
        year: '2025',
        image: '/elan/elan1.webp',
        images: ['/elan/elan1.webp', '/elan/elan2.webp', '/elan/elan3.webp'],
        tags: ['UI/UX', 'Web', 'Figma', 'Responsive'],
        desc: 'A bold and elegant website template for modern dance studios, featuring dramatic red tones and a sleek dark layout. Designed to highlight movement and emotion, it includes a dynamic hero section, studio gallery, and immersive visuals to create a premium, high-energy experience.',
        role: 'UX/UI Designer',
        duration: '4 weeks',
    },
    {
        id: 2,
        index: '02',
        title: 'Apex',
        category: 'Venture and Investment',
        year: '2026',
        image: '/apex/apex1.webp',
        images: ['/apex/apex1.webp', '/apex/apex2.webp', '/apex/apex3.webp'],
        tags: ['Prototype', 'UI/UX', 'Web', 'Responsive'],
        desc: 'A modern and professional website template designed for venture capital and investment firms. Featuring a sleek dark-blue interface, clean typography, and data-focused sections, the design highlights portfolio companies, impact metrics, and investment strategy with a strong, credible, and forward-thinking visual identity.',
        role: 'UI Designer',
        duration: '5 weeks',
    },
    {
        id: 3,
        index: '03',
        title: 'Mentora',
        category: 'Online Education Platform',
        year: '2026',
        image: '/mentora/mentora1.webp',
        images: ['/mentora/mentora1.webp', '/mentora/mentora2.webp', '/mentora/mentora3.webp'],
        tags: ['UI/UX', 'Web Design', 'Figma', 'Responsive'],
        desc: 'A modern and clean e-learning website design focused on practical skill development. It features clear call-to-actions, organized course categories, and a fully responsive layout for both desktop and mobile, ensuring a smooth and engaging user experience.',
        role: 'UI Designer',
        duration: '5 weeks',
    },
];

// ─── Project Detail Modal ───────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
    const modalRef = useRef(null);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        // Animate in
        gsap.fromTo(modalRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleClose = useCallback(() => {
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: onClose,
        });
    }, [onClose]);

    // Close on Escape key — include handleClose in deps to avoid stale closure
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleClose]);

    return (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Modal Panel */}
            <div
                ref={modalRef}
                className="relative z-10 w-full sm:w-[90vw] max-w-5xl max-h-[90vh] bg-dark-bg border border-dark-text/10 rounded-t-[28px] sm:rounded-[28px] overflow-y-auto overscroll-contain"
                data-scroll-lock
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-text/10">
                    <div className="flex items-baseline gap-4">
                        <span className="font-body text-[10px] font-bold tracking-[3px] uppercase text-accent-violet">
                            {project.index}
                        </span>
                        <h3 className="font-display text-2xl sm:text-4xl uppercase leading-none tracking-[-0.5px] text-dark-text">
                            {project.title}
                        </h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full border border-dark-text/15 flex items-center justify-center text-dark-text/60 hover:text-dark-text hover:border-accent-violet transition-colors duration-300"
                        aria-label="Close"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 sm:px-10 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Left: Images */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-dark-text/5">
                            <img
                                src={project.images[activeImg]}
                                alt={project.title}
                                loading="lazy"
                                width={800}
                                height={600}
                                className="w-full h-full object-contain transition-opacity duration-300"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {project.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImg === i ? 'border-accent-violet' : 'border-transparent opacity-50 hover:opacity-75'}`}
                                >
                                    <img src={img} alt="" loading="lazy" width={240} height={180} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col gap-6 sm:gap-8">
                        {/* Meta */}
                        <div className="grid grid-cols-3 gap-4 pb-6 border-b border-dark-text/10">
                            <div>
                                <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-accent-violet mb-1.5">Year</p>
                                <p className="font-display text-xl uppercase text-dark-text">{project.year}</p>
                            </div>
                            <div>
                                <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-accent-violet mb-1.5">Role</p>
                                <p className="font-display text-xl uppercase text-dark-text leading-tight">{project.role}</p>
                            </div>
                            <div>
                                <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-accent-violet mb-1.5">Duration</p>
                                <p className="font-display text-xl uppercase text-dark-text">{project.duration}</p>
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-dark-text/30 mb-2">Category</p>
                            <p className="font-serif italic text-lg sm:text-xl text-dark-text/70">{project.category}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-dark-text/30 mb-3">Overview</p>
                            <p className="font-body text-sm sm:text-base leading-relaxed text-dark-text/60">
                                {project.desc}
                            </p>
                        </div>

                        {/* Tags */}
                        <div>
                            <p className="font-body text-[9px] font-bold tracking-[3px] uppercase text-dark-text/30 mb-3">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="font-body text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full border border-accent-violet text-accent-violet">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};


// ─── Main Projects Section ───────────────────────────────────────────────
import { Link } from 'react-router-dom';

const Projects = ({ limit }) => {
    const container = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const previewRef = useRef(null);
    const listRef = useRef(null);

    const displayProjects = limit ? projectsData.slice(0, limit) : projectsData;

    useGSAP(() => {
        gsap.from('.proj-char', {
            y: 100, opacity: 0, rotateX: -90, stagger: 0.03, duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: '.proj-title', start: 'top 88%' }
        });
        gsap.from('.proj-divider', {
            scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: '.proj-divider', start: 'top 90%' }
        });
        gsap.from('.proj-row', {
            y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.proj-list', start: 'top 82%' }
        });
    }, { scope: container });


    const handleMouseMove = (e) => {
        if (!previewRef.current) return;
        gsap.to(previewRef.current, {
            x: e.clientX - 120, y: e.clientY - 80,
            duration: 0.4, ease: 'power2.out',
        });
    };

    const handleRowEnter = (project) => {
        setHoveredId(project.id);
        setPreviewSrc(project.image);
        if (previewRef.current) {
            gsap.killTweensOf(previewRef.current); // Cancel any pending leave fade-out
            gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
        }
    };

    const handleRowLeave = () => {
        setHoveredId(null);
        // Only fade out visually — do NOT null previewSrc here,
        // because mouseEnter on the next row fires right after and needs the image to stay.
        if (previewRef.current) {
            gsap.to(previewRef.current, {
                opacity: 0, scale: 0.88, duration: 0.3, ease: 'power2.in',
            });
        }
    };

    // Safety net: if cursor leaves the entire projects section, force-hide everything
    const handleSectionLeave = () => {
        setHoveredId(null);
        if (previewRef.current) {
            gsap.killTweensOf(previewRef.current);
            gsap.set(previewRef.current, { opacity: 0, scale: 0.88 });
        }
        setPreviewSrc(null);
    };

    return (
        <section
            ref={container}
            id="projects"
            className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-4 pb-16 sm:pt-8 sm:pb-24 md:pt-12 md:pb-32 relative z-20"
            onMouseLeave={handleSectionLeave}
        >
            {/* Floating cursor preview */}
            <div
                ref={previewRef}
                className="fixed top-0 left-0 w-[240px] aspect-[4/3] h-auto rounded-2xl overflow-hidden pointer-events-none z-[200] opacity-0 scale-90"
            >
                {previewSrc && <img src={previewSrc} alt="" className="w-full h-full object-contain" />}
            </div>

            <div className="proj-title flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                <h2 className="font-display text-[clamp(32px,8vw,100px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px] perspective-[1000px]">
                    <CharReveal charClass="proj-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Selected </CharReveal>
                    <CharReveal charClass="proj-char">Projects</CharReveal>
                </h2>
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-primary-text/40 font-semibold sm:mb-4">
                    {projectsData.length} Works
                </p>
            </div>


            <div className="proj-divider w-full h-[1px] bg-primary-text/15 mb-0" />

            {/* Project Rows */}
            <div ref={listRef} className="proj-list flex flex-col">
                {displayProjects.map((project) => (
                    <div
                        key={project.id}
                        className="proj-row group relative border-b border-primary-text/10"
                        onMouseEnter={() => handleRowEnter(project)}
                        onMouseLeave={handleRowLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <button
                            onClick={() => setSelectedProject(project)}
                            className={`w-full text-left flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-7 sm:py-9 transition-all duration-300 ${hoveredId === project.id ? 'pl-4 sm:pl-8' : 'pl-0'}`}
                        >
                            <span className={`font-body text-[10px] font-bold tracking-[3px] uppercase transition-colors duration-300 sm:w-16 flex-shrink-0 ${hoveredId === project.id ? 'text-accent-violet' : 'text-primary-text/90'}`}>
                                {project.index}
                            </span>
                            <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                                <h3 className={`font-display text-[clamp(26px,4.5vw,60px)] uppercase leading-none tracking-[-0.5px] transition-colors duration-300 ${hoveredId === project.id ? 'text-accent-violet' : 'text-primary-text'}`}>
                                    {project.title}
                                </h3>
                                <span className="font-serif italic text-sm sm:text-base text-primary-text/80">
                                    {project.category}
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                                {project.tags.map(tag => (
                                    <span key={tag} className={`font-body text-[9px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full border transition-all duration-300 ${hoveredId === project.id ? 'border-accent-violet text-accent-violet' : 'border-primary-text/15 text-primary-text/60'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6 sm:ml-6 flex-shrink-0">
                                <span className={`font-body text-[10px] sm:text-xs font-semibold tracking-[2px] uppercase transition-colors duration-300 ${hoveredId === project.id ? 'text-primary-text/80' : 'text-primary-text/60'}`}>
                                    {project.year}
                                </span>
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${hoveredId === project.id ? 'bg-accent-violet border-accent-violet text-dark-bg scale-110' : 'border-primary-text/20 text-primary-text/60'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            {limit && projectsData.length > limit && (
                <div className="mt-12 flex justify-center pb-8">
                    <Link
                        to="/projects"
                        className="group flex items-center gap-6 px-8 py-4 rounded-full border border-primary-text/10 hover:border-accent-violet transition-all duration-300"
                    >
                        <span className="font-body text-xs font-bold tracking-[3px] uppercase text-primary-text/60 group-hover:text-accent-violet transition-colors">
                            View All Projects
                        </span>
                        <div className="w-10 h-10 rounded-full border border-primary-text/15 group-hover:border-accent-violet group-hover:bg-accent-violet group-hover:text-dark-bg flex items-center justify-center transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>
                </div>
            )}



            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;
