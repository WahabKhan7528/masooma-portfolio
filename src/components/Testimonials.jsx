import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        quote: "Masooma's design sense is extraordinary. She transformed our brand identity into something truly memorable — every detail was considered and refined.",
        name: 'Sarah Chen',
        role: 'CEO, Lumina Studio',
        initials: 'SC',
    },
    {
        id: 2,
        quote: "Working with Masooma felt effortless. She understood our vision from the first call and delivered a product that exceeded all expectations.",
        name: 'James Walker',
        role: 'Founder, Nova App',
        initials: 'JW',
    },
    {
        id: 3,
        quote: "Her attention to micro-interactions and user flow is next-level. Our conversion rate jumped 40% after the redesign she led.",
        name: 'Priya Patel',
        role: 'Product Lead, Aurora Market',
        initials: 'PP',
    },
    {
        id: 4,
        quote: "Masooma doesn't just design interfaces — she crafts experiences. Her design system became the backbone of our entire engineering workflow.",
        name: 'Alex Rivera',
        role: 'CTO, Nexus Analytics',
        initials: 'AR',
    },
];

const Testimonials = () => {
    const container = useRef(null);
    const trackRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, scrollLeft: 0 });

    useGSAP(() => {
        gsap.from('.testimonial-heading', {
            y: 60, opacity: 0, duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: container.current, start: 'top 85%' }
        });
        gsap.from('.testimonial-card', {
            y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.testimonial-track', start: 'top 85%' }
        });
    }, { scope: container });

    // Drag-to-scroll handlers
    const handleMouseDown = (e) => {
        if (!trackRef.current) return;
        setIsDragging(true);
        dragStart.current = { x: e.pageX, scrollLeft: trackRef.current.scrollLeft };
        trackRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        const dx = e.pageX - dragStart.current.x;
        trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (trackRef.current) trackRef.current.style.cursor = 'grab';
    };

    // Touch support
    const handleTouchStart = (e) => {
        if (!trackRef.current) return;
        dragStart.current = { x: e.touches[0].pageX, scrollLeft: trackRef.current.scrollLeft };
    };
    const handleTouchMove = (e) => {
        if (!trackRef.current) return;
        const dx = e.touches[0].pageX - dragStart.current.x;
        trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    });

    return (
        <section
            ref={container}
            className="w-full py-16 sm:py-24 md:py-32 relative z-20 overflow-hidden"
        >
            {/* Header */}
            <div className="testimonial-heading max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="font-display text-[clamp(32px,8vw,100px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px]">
                    <span className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Kind </span>
                    Words
                </h2>
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-primary-text/40 font-semibold sm:mb-3">
                    Drag to explore →
                </p>
            </div>

            {/* Draggable Carousel Track */}
            <div
                ref={trackRef}
                className="testimonial-track flex gap-5 sm:gap-6 px-4 sm:px-6 md:px-10 overflow-x-auto scrollbar-hide pb-4"
                style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="testimonial-card flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[calc(33.333%-16px)] p-7 sm:p-9 rounded-[24px] sm:rounded-[28px] bg-primary-text/[0.04] backdrop-blur-xl border border-primary-text/10 flex flex-col justify-between gap-6 sm:gap-8 select-none"
                    >
                        {/* Quote */}
                        <div>
                            <span className="font-serif text-accent-violet text-4xl sm:text-5xl leading-none block mb-3 opacity-60">"</span>
                            <p className="font-body italic text-base sm:text-[17px] text-primary-text/90 leading-relaxed font-medium">
                                {t.quote}
                            </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center">
                                <span className="font-body text-xs font-bold tracking-wider text-accent-violet">{t.initials}</span>
                            </div>
                            <div>
                                <p className="font-display text-sm uppercase tracking-wide text-primary-text leading-tight">{t.name}</p>
                                <p className="font-body text-[10px] tracking-[2px] uppercase text-primary-text/40 font-semibold mt-0.5">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Spacer for last card peek */}
                <div className="flex-shrink-0 w-4 sm:w-10" />
            </div>
        </section>
    );
};

export default Testimonials;
