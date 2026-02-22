const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="bg-dark-bg text-dark-text px-5 md:px-10 pt-[100px] pb-[50px] relative z-10 text-center flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <h2 className="font-display text-4xl md:text-[80px] uppercase leading-[1.1] tracking-[-1px] mb-10">
                    Feel Like<br />Collaborating?
                </h2>

                <a
                    href="mailto:masooma@example.com"
                    className="font-serif italic text-base sm:text-lg md:text-[28px] text-accent-violet inline-block mb-8 sm:mb-10 md:mb-12 transition-colors duration-400 border-b border-transparent hover:border-accent-violet"
                >
                    masooma@example.com
                </a>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-10 mb-10 sm:mb-12 md:mb-16">
                    {['LinkedIn', 'Behance', 'Instagram'].map(social => (
                        <a
                            key={social}
                            href={`https://${social.toLowerCase()}.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-[10px] sm:text-[11px] font-semibold tracking-[2px] sm:tracking-[3px] uppercase text-dark-text relative group transition-colors hover:text-accent-violet"
                        >
                            {social}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-violet transition-all duration-400 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-6xl border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <p className="text-[10px] sm:text-[11px] tracking-[1px] sm:tracking-[2px] uppercase opacity-40">
                    &copy; 2026 Masooma
                </p>
                <button
                    onClick={scrollToTop}
                    className="text-[10px] sm:text-[11px] tracking-[1px] sm:tracking-[2px] uppercase opacity-40 cursor-pointer bg-transparent border-none text-dark-text transition-all duration-400 hover:opacity-100 hover:text-accent-violet"
                >
                    Back to Top ↑
                </button>
            </div>
        </footer>
    );
};

export default Footer;
