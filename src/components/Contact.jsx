import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const SquiggleDivider = () => (
    <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 -translate-y-1/2 pointer-events-none">
        <svg className="w-full h-8 sm:h-12 text-[#A58BFF] opacity-30" viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 30 C 100 15, 200 45, 300 30 C 400 15, 500 20, 600 35 C 700 50, 800 20, 900 30 C 1000 40, 1100 15, 1200 30" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const Contact = () => {
    const container = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useGSAP(() => {
        gsap.from('.contact-elem', {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: container.current, start: 'top 75%' }
        });
    }, { scope: container });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
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

    const HoverButton = ({ type = "button", text, isSubmitting }) => {
        return (
            <button type={type} disabled={isSubmitting} className={`group relative w-full sm:w-[24rem] h-16 md:h-[4.5rem] bg-[#EBE6DA] dark:bg-primary-text/5 border-[2px] border-[#A58BFF] rounded-full flex items-center px-2 md:px-3 overflow-hidden transition-transform ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                <div className="absolute left-2 md:left-3 w-12 h-12 md:w-14 md:h-14 bg-[#A58BFF] rounded-full flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:left-[calc(100%-3.5rem)] md:group-hover:left-[calc(100%-4.25rem)] z-10">
                    <svg className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isSubmitting ? 'animate-pulse' : '-rotate-45 group-hover:rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <span className="w-full text-center font-body text-base md:text-lg font-bold text-primary-text transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-5 z-0 uppercase tracking-wide">
                    {isSubmitting ? 'Sending...' : text}
                </span>
            </button>
        );
    };

    return (
        <section
            ref={container}
            id="contact"
            className="w-full py-20 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-32 bg-primary-bg relative"
        >
            <SquiggleDivider />
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">
                
                {/* Left: Info */}
                <div className="lg:w-1/2 flex flex-col gap-10">
                    <div className="contact-elem">
                        <h2 className="font-display text-[clamp(40px,5vw,70px)] uppercase leading-[0.9] tracking-[-2px] text-primary-text mb-6">
                            Let's get in <span className="font-serif italic lowercase font-normal text-[#A58BFF]">touch</span>
                        </h2>
                        <p className="font-body text-base sm:text-lg text-primary-text/70 leading-relaxed font-medium max-w-md">
                            Have a project in mind, want to collaborate, or just want to say hi? Fill in the form and I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="contact-elem flex flex-col gap-6 mt-4">
                        <div className="flex flex-col gap-4 bg-primary-text/5 border-[2px] border-[#A58BFF]/20 rounded-[32px] p-8 hover:border-[#A58BFF]/50 transition-colors duration-300">
                            <p className="font-body text-xs font-bold tracking-[3px] uppercase text-[#A58BFF]">Email</p>
                            <a href="mailto:masooma0225@gmail.com" className="font-body text-lg sm:text-xl md:text-2xl font-bold text-primary-text hover:text-[#A58BFF] transition-colors duration-300 flex flex-wrap items-center gap-2 sm:gap-3 break-all">
                                masooma0225@gmail.com
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                        </div>
                        <div className="flex flex-col gap-4 bg-primary-text/5 border-[2px] border-[#A58BFF]/20 rounded-[32px] p-8 hover:border-[#A58BFF]/50 transition-colors duration-300">
                            <p className="font-body text-xs font-bold tracking-[3px] uppercase text-[#A58BFF]">Socials</p>
                            <div className="flex gap-8">
                                <a href="https://www.linkedin.com/in/masooma-batool-b9b679387" target="_blank" rel="noopener noreferrer"
                                    className="group relative font-body text-base font-bold tracking-[2px] uppercase text-primary-text hover:text-[#A58BFF] transition-colors duration-300 flex items-center gap-2">
                                    LinkedIn
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A58BFF] transition-all duration-300 group-hover:w-full" />
                                </a>
                                <a href="https://www.instagram.com/craf_to_ria/" target="_blank" rel="noopener noreferrer"
                                    className="group relative font-body text-base font-bold tracking-[2px] uppercase text-primary-text hover:text-[#A58BFF] transition-colors duration-300 flex items-center gap-2">
                                    Instagram
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A58BFF] transition-all duration-300 group-hover:w-full" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="lg:w-1/2 contact-elem">
                    {!submitted ? (
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-body text-xs font-bold tracking-[2px] uppercase text-primary-text/70 ml-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-primary-text/5 border-[2px] border-primary-text/10 rounded-full px-6 py-4 font-body text-base font-medium text-primary-text focus:outline-none focus:border-[#A58BFF] transition-colors duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-body text-xs font-bold tracking-[2px] uppercase text-primary-text/70 ml-2">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-primary-text/5 border-[2px] border-primary-text/10 rounded-full px-6 py-4 font-body text-base font-medium text-primary-text focus:outline-none focus:border-[#A58BFF] transition-colors duration-300"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2 mb-2">
                                <label htmlFor="message" className="font-body text-xs font-bold tracking-[2px] uppercase text-primary-text/70 ml-2">
                                    Your Message *
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-primary-text/5 border-[2px] border-primary-text/10 rounded-3xl px-6 py-4 font-body text-base font-medium text-primary-text focus:outline-none focus:border-[#A58BFF] transition-colors duration-300 resize-y"
                                />
                            </div>

                            {/* Submit */}
                            <HoverButton type="submit" text="Send Message" isSubmitting={isSubmitting} />
                        </form>
                    ) : (
                        <div className="flex flex-col items-start justify-center h-full gap-6 bg-primary-text/5 border-[2px] border-[#A58BFF]/30 p-10 rounded-[40px]">
                            <div className="w-16 h-16 rounded-full bg-[#A58BFF] flex items-center justify-center shadow-lg shadow-[#A58BFF]/20">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl uppercase tracking-[-1px] text-primary-text">Message Sent!</h3>
                            <p className="font-body text-lg text-primary-text/70 leading-relaxed font-medium">
                                Thanks for reaching out. I'll get back to you within 24-48 hours.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
