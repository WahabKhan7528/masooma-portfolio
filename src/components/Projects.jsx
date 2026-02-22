import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return { ref, isVisible };
};

const ProjectCard = ({ title, category, imageSrc, delay }) => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <article
            ref={ref}
            className={`group relative transition-all duration-[800ms] ease-out outline-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <a href="#" className="block outline-none cursor-none-if-custom">
                <div className="relative rounded-[20px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden aspect-[4/3] bg-accent group-hover:shadow-2xl transition-all duration-[600ms] group-hover:-translate-y-2 transform-gpu translate-z-0">
                    <img
                        src={imageSrc}
                        alt={`${title} — ${category}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                    />

                    <div className="absolute top-0 left-0 w-full h-full bg-primary-text/0 group-hover:bg-primary-text/10 transition-colors duration-500 rounded-[20px] sm:rounded-[28px] md:rounded-[32px] pointer-events-none"></div>

                    {/* Rotating Badge */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full bg-white/90 backdrop-blur-sm text-primary-text flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-accent-violet group-hover:text-white transition-all duration-500 z-10 shadow-xl overflow-hidden">
                        <div className="absolute inset-1.5 sm:inset-2 animate-[spin_8s_linear_infinite]">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <path id={`circlePath-${title.replace(/\s+/g, '')}`} d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                                <text fill="currentColor" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1.5" fontWeight="600" textTransform="uppercase">
                                    <textPath href={`#circlePath-${title.replace(/\s+/g, '')}`} startOffset="0%">
                                        PROJECT VIEW &bull; PROJECT VIEW &bull;
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        {/* Perfectly Centered Arrow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="pt-4 sm:pt-6 px-1 sm:px-2 flex justify-between items-start">
                    <div>
                        <h3 className="font-display text-[clamp(20px,3vw,36px)] uppercase tracking-[0.5px] sm:tracking-[1px] mb-1 group-hover:text-accent-violet transition-colors">
                            {title}
                        </h3>
                        <p className="font-serif italic text-[13px] sm:text-[15px] text-primary-text/60 tracking-[0.5px]">
                            {category}
                        </p>
                    </div>
                </div>
            </a>
        </article>
    );
};

const Projects = () => {
    const container = useRef(null);
    const [showAll, setShowAll] = useState(false);

    useGSAP(() => {
        gsap.from('.projects-header-anim', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container.current,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
            }
        });
    }, { scope: container });

    const projectsData = [
        { id: 1, title: 'Nova App', category: 'Mobile application design', image: '/project1.png' },
        { id: 2, title: 'Lumina Studio', category: 'Brand identity system', image: '/project2.png' },
        { id: 3, title: 'Aurora Market', category: 'E-commerce platform', image: '/project1.png' },
        { id: 4, title: 'Nexus Dashboard', category: 'SaaS product design', image: '/project2.png' },
    ];

    const visibleProjects = showAll ? projectsData : projectsData.slice(0, 2);

    return (
        <section ref={container} id="projects" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 relative z-20 overflow-hidden">
            <div className="projects-header-anim mb-10 sm:mb-12 md:mb-16">
                <h2 className="font-display text-[clamp(32px,8vw,90px)] uppercase leading-[1] tracking-[-1px]">
                    <span className="font-serif italic lowercase tracking-[1px] font-normal text-accent-violet">Selected </span>
                    Projects
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
                {visibleProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        category={project.category}
                        imageSrc={project.image}
                        delay={(index % 4) * 150}
                    />
                ))}
            </div>

            {!showAll && projectsData.length > 2 && (
                <div className="mt-10 sm:mt-12 md:mt-16 flex justify-center">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-primary-text/20 text-primary-text font-body text-[10px] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] font-semibold hover:bg-accent-violet hover:text-white hover:border-accent-violet transition-all duration-300"
                    >
                        View More
                    </button>
                </div>
            )}
        </section>
    );
};

export default Projects;
