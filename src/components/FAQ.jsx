import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const faqs = [
    {
        question: "What's your typical process?",
        answer: "My process usually involves four phases: Discovery & Planning, Design, Development, and Delivery. I start by understanding your goals, then I create wireframes and designs, build out the solution using modern tech, and finally deploy and hand off the project."
    },
    {
        question: "What information do you need to start?",
        answer: "To get started, I need a clear understanding of your project goals, target audience, preferred timeline, and any existing brand assets or design inspiration you might have."
    },
    {
        question: "Do you take freelance projects right now?",
        answer: "Yes! I am currently accepting new freelance projects. Feel free to reach out via the contact form above to discuss your project in detail."
    },
    {
        question: "What's your typical response time?",
        answer: "I typically respond to all inquiries within 24-48 hours during business days."
    }
];

const FAQItem = ({ question, answer, isOpen, onHover }) => {
    const contentRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
        } else {
            gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-primary-text/10 py-6" onMouseEnter={onHover}>
            <button 
                onClick={onHover}
                className="w-full flex items-center justify-between gap-4 text-left group"
            >
                <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[-1px] text-primary-text group-hover:text-[#A58BFF] transition-colors duration-300">
                    {question}
                </h3>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full border-[2px] flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-45 bg-[#A58BFF] border-[#A58BFF] text-white' : 'border-[#A58BFF] text-[#A58BFF] group-hover:bg-[#A58BFF] group-hover:text-white'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </button>
            <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
                <p className="font-body text-base sm:text-lg text-primary-text/70 font-medium leading-relaxed mt-6 max-w-3xl">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="w-full py-20 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-32 bg-primary-bg flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="lg:w-1/3">
                <h2 className="font-display text-[clamp(40px,6vw,80px)] uppercase leading-[0.9] tracking-[-2px] text-primary-text">
                    Common <span className="font-serif italic lowercase font-normal text-[#A58BFF] block">Queries</span>
                </h2>
                <p className="font-body text-base mt-6 text-primary-text/60 font-medium max-w-sm">
                    Here are some of the most frequently asked questions about working with me. If you have any other questions, feel free to ask!
                </p>
            </div>
            <div className="lg:w-2/3 flex flex-col">
                {faqs.map((faq, index) => (
                    <FAQItem 
                        key={index} 
                        question={faq.question} 
                        answer={faq.answer} 
                        isOpen={openIndex === index}
                        onHover={() => setOpenIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FAQ;
