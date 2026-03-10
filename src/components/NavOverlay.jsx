const NavOverlay = ({ isOpen, closeMenu }) => {
    // renderLinks is driven by isOpen — CSS transition-delay handles the stagger timing
    const renderLinks = isOpen;

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 right-0 w-full h-screen bg-dark-bg z-[90] flex items-center justify-center transition-transform duration-[600ms] ease-custom ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <button
                onClick={closeMenu}
                className="absolute top-4 sm:top-6 right-4 sm:right-5 md:right-10 bg-accent-violet text-dark-bg border-none font-body text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors duration-400 hover:bg-dark-text hover:text-dark-bg"
            >
                Close
            </button>

            <ul className="flex flex-col items-center gap-2 sm:gap-3">
                {links.map((link, index) => (
                    <li key={link.name} className="overflow-hidden">
                        <a
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                closeMenu();
                                const el = document.getElementById(link.href.replace('#', ''));
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`block font-display text-4xl sm:text-5xl md:text-7xl lg:text-[90px] uppercase tracking-[2px] text-dark-text transition-all duration-[800ms] ease-out hover:text-accent-violet transform hover:translate-x-5 ${renderLinks ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavOverlay;
