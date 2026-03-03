import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CharReveal from './shared/CharReveal';

const Contact = () => {
    const container = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(() => {
        gsap.from('.contact-char', {
            y: 100,
            opacity: 0,
            rotateX: -90,
            stagger: 0.03,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 85%' }
        });
        gsap.from('.contact-card', {
            y: 60, opacity: 0, duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: '.contact-card', start: 'top 85%' }
        });
    }, { scope: container });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Dynamic import — only load emailjs when user actually submits
            const { default: emailjs } = await import('@emailjs/browser');
            await emailjs.sendForm(
                import.meta.env.EMAILJS_SERVICE_ID,
                import.meta.env.EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.EMAILJS_PUBLIC_KEY
            );
            setSubmitted(true);
        } catch (error) {
            if (import.meta.env.DEV) console.error('FAILED...', error);
            alert("Failed to send message. Please check your EmailJS configuration.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={container}
            id="contact"
            className="w-full flex items-center justify-center py-20 sm:py-32"
        >
            {/* 80vw x 80vh Centered Card */}
            <div className="contact-card bg-dark-bg rounded-[32px] sm:rounded-[60px] w-[90vw] lg:w-[80vw] h-auto lg:min-h-[80vh] px-8 sm:px-16 md:px-20 py-12 sm:py-16 md:py-20 text-dark-text flex flex-col justify-between shadow-2xl overflow-hidden">

                <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                        <h2 className="font-display text-[clamp(28px,6vw,80px)] uppercase leading-none tracking-[-1px] sm:tracking-[-2px] perspective-[1000px]">
                            <CharReveal charClass="contact-char" className="font-serif italic lowercase font-normal text-accent-violet tracking-[1px]">Get In </CharReveal>
                            <CharReveal charClass="contact-char">Touch</CharReveal>
                        </h2>
                        <p className="font-body text-[10px] sm:text-xs uppercase tracking-[3px] text-dark-text/40 font-semibold sm:mb-2">
                            Let's work together
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-dark-text/10 mb-8 sm:mb-12" />
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 overflow-visible">

                    {/* Left: Info */}
                    <div className="flex flex-col gap-6 justify-center">
                        <p className="font-body text-base sm:text-lg text-dark-text/60 leading-relaxed max-w-md">
                            Have a project in mind, want to collaborate, or just want to say hi? Fill in the form and I'll get back to you as soon as possible.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-accent-violet">Email</p>
                                <a href="mailto:masooma@example.com" className="font-body text-base sm:text-lg text-dark-text/80 hover:text-accent-violet transition-colors duration-300">
                                    masooma0225@gmail.com
                                </a>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="font-body text-[10px] font-bold tracking-[3px] uppercase text-accent-violet">Socials</p>
                                <div className="flex gap-6">
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
                        </div>
                    </div>

                    {/* Right: Form */}
                    {!submitted ? (
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col justify-center gap-4 sm:gap-6">
                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-body text-[10px] font-bold tracking-[3px] uppercase text-dark-text/40">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className="w-full bg-dark-text/5 border border-dark-text/10 rounded-xl px-5 py-3.5 font-body text-sm text-dark-text placeholder:text-dark-text/20 focus:outline-none focus:border-accent-violet transition-colors duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-body text-[10px] font-bold tracking-[3px] uppercase text-dark-text/40">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full bg-dark-text/5 border border-dark-text/10 rounded-xl px-5 py-3.5 font-body text-sm text-dark-text placeholder:text-dark-text/20 focus:outline-none focus:border-accent-violet transition-colors duration-300"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-body text-[10px] font-bold tracking-[3px] uppercase text-dark-text/40">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Your message..."
                                    className="w-full bg-dark-text/5 border border-dark-text/10 rounded-xl px-5 py-3.5 font-body text-sm text-dark-text placeholder:text-dark-text/20 focus:outline-none focus:border-accent-violet transition-colors duration-300 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`self-start group flex items-center gap-3 bg-accent-violet text-dark-bg px-8 py-4 rounded-full font-body text-xs font-bold tracking-[2px] uppercase transition-colors duration-300 mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-dark-text hover:text-dark-bg'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send'}
                                {!isSubmitting && (
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-start justify-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-accent-violet/15 flex items-center justify-center">
                                <svg className="w-7 h-7 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-display text-3xl uppercase tracking-[-1px] text-dark-text">Sent!</h3>
                            <p className="font-body text-base text-dark-text/50 leading-relaxed max-w-xs">
                                Thanks for reaching out. I'll get back to you soon.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
