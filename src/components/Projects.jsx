import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Reusable character-split reveal component
const CharReveal = ({ children, className = '' }) => {
    const chars = children.split('');
    return (
        <span className={className}>
            {chars.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span className="proj-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

const projectsData = [
    {
        id: 1,
        index: '01',
        title: 'Nova App',
        category: 'Mobile Application Design',
        year: '2024',
        image: '/project1.png',
        images: ['/project1.png', '/project2.png', '/project1.png'],
        tags: ['UX', 'Mobile', 'Figma'],
        desc: 'Nova App is a lifestyle and productivity mobile application focused on minimalist UI, smooth micro-interactions, and an intuitive user flow. The project involved full end-to-end product design from research, wireframing, and usability testing to final high-fidelity prototypes.',
        role: 'UX/UI Designer',
        duration: '6 weeks',
    },
    {
        id: 2,
        index: '02',
        title: 'Lumina Studio',
        category: 'Brand Identity System',
        year: '2024',
        image: '/project2.png',
        images: ['/project2.png', '/project1.png', '/project2.png'],
        tags: ['Branding', 'Visual Design'],
        desc: 'Lumina Studio is a full brand identity system created for a creative photography studio. Includes logo design, typography system, color palette, and brand guidelines — crafted to feel premium, modern, and timeless.',
        role: 'Brand Designer',
        duration: '4 weeks',
    },
    {
        id: 3,
        index: '03',
        title: 'Aurora Market',
        category: 'E-Commerce Platform',
        year: '2023',
        image: '/project1.png',
        images: ['/project1.png', '/project2.png', '/project1.png'],
        tags: ['UI', 'Web Design', 'Figma'],
        desc: 'Aurora Market is a fully designed e-commerce platform for an artisanal goods brand. The design prioritizes an editorial feel, rich product photography, and a seamless checkout experience across all device sizes.',
        role: 'UI Designer',
        duration: '8 weeks',
    },
    {
        id: 4,
        index: '04',
        title: 'Nexus Dashboard',
        category: 'SaaS Product Design',
        year: '2023',
        image: '/project2.png',
        images: ['/project2.png', '/project1.png', '/project2.png'],
        tags: ['Dashboard', 'Design System'],
        desc: 'Nexus is a dense SaaS analytics dashboard built around clarity and performance. Designed a scalable component library in Figma that supports light/dark modes and multiple user roles — enabling the engineering team to ship fast.',
        role: 'Product Designer',
        duration: '10 weeks',
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

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: onClose,
        });
    };

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

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
                                className="w-full h-full object-cover transition-opacity duration-300"
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
                                    <img src={img} alt="" className="w-full h-full object-cover" />
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

// Fixed categories for filter tabs based on feedback
const allTags = ['All', 'UX', 'Figma', 'Web Design', 'Mobile'];

// ─── Main Projects Section ───────────────────────────────────────────────
const Projects = () => {
    const container = useRef(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const previewRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const listRef = useRef(null);

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

    // Handle filter change with GSAP animation
    const handleFilterChange = (tag) => {
        if (tag === activeFilter) return;
        setActiveFilter(tag);

        // Animate existing rows out
        const rows = listRef.current?.querySelectorAll('.proj-row');
        if (rows && rows.length > 0) {
            gsap.to(rows, {
                y: -20, opacity: 0, stagger: 0.04, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    // Update filtered data
                    const newFiltered = tag === 'All'
                        ? projectsData
                        : projectsData.filter(p => p.tags.includes(tag));
                    setFilteredProjects(newFiltered);

                    // Animate new rows in (needs a tick for React to render)
                    requestAnimationFrame(() => {
                        const newRows = listRef.current?.querySelectorAll('.proj-row');
                        if (newRows) {
                            gsap.fromTo(newRows,
                                { y: 30, opacity: 0 },
                                { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' }
                            );
                        }
                    });
                }
            });
        } else {
            const newFiltered = tag === 'All'
                ? projectsData
                : projectsData.filter(p => p.tags.includes(tag));
            setFilteredProjects(newFiltered);
        }
    };

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
            className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 relative z-20"
            onMouseLeave={handleSectionLeave}
        >
            {/* Floating cursor preview */}
            <div
                ref={previewRef}
                className="fixed top-0 left-0 w-[240px] h-[160px] rounded-2xl overflow-hidden pointer-events-none z-[200] opacity-0 scale-90"
                style={{ willChange: 'transform' }}
            >
                {previewSrc && <img src={previewSrc} alt="" className="w-full h-full object-cover" />}
            </div>

            <div className="proj-title flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                <h2 className="font-display text-[clamp(32px,8vw,100px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px] perspective-[1000px]">
                    <CharReveal className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Selected </CharReveal>
                    <CharReveal>Projects</CharReveal>
                </h2>
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-primary-text/40 font-semibold sm:mb-4">
                    {filteredProjects.length} Works
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleFilterChange(tag)}
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-body text-[10px] sm:text-xs font-bold tracking-[2px] uppercase transition-all duration-300 border ${activeFilter === tag
                            ? 'bg-accent-violet text-dark-bg border-accent-violet'
                            : 'bg-transparent text-primary-text/60 border-primary-text/15 hover:border-accent-violet hover:text-accent-violet'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="proj-divider w-full h-[1px] bg-primary-text/15 mb-0" />

            {/* Project Rows */}
            <div ref={listRef} className="proj-list flex flex-col">
                {filteredProjects.map((project) => (
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

            {/* Empty state */}
            {filteredProjects.length === 0 && (
                <div className="py-16 text-center">
                    <p className="font-body text-sm text-primary-text/40 uppercase tracking-[2px]">No projects match this filter</p>
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
