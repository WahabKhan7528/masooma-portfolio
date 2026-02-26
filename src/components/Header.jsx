import { useState, useEffect } from 'react';
const Header = ({ toggleMenu }) => {
    const [activeSection, setActiveSection] = useState('home');

    // Dark mode state — defaults to light, checks localStorage
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleNavClick = (e, section) => {
        e.preventDefault();
        setActiveSection(section);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Use smooth since transition is gone
        }
    };

    return (
        <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 z-40 bg-transparent pointer-events-none">
            {/* Left Logo */}
            <div className="font-display text-2xl lowercase tracking-wider pointer-events-auto text-accent-violet">
                mb.
            </div>

            {/* Right Pill Navigation + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3 pointer-events-auto">
                <nav className="flex items-center gap-1 bg-primary-text/5 backdrop-blur-md border border-primary-text/10 shadow-sm rounded-full p-1.5 transition-all">
                    {['home', 'projects', 'about', 'contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => handleNavClick(e, item)}
                            className={`px-6 py-2 rounded-full font-body text-sm font-semibold tracking-wide transition-colors duration-300 capitalize ${activeSection === item
                                ? 'bg-accent-violet text-dark-bg'
                                : 'text-primary-text hover:bg-primary-text/10 font-medium'
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Theme Toggle Button (Pill Switch) */}
                <button
                    onClick={() => setIsDark(prev => !prev)}
                    className="relative w-16 h-8 rounded-full bg-primary-text/5 border border-primary-text/20 flex items-center px-1 transition-colors duration-300"
                    aria-label="Toggle dark mode"
                >
                    <div
                        className={`w-6 h-6 rounded-full shadow-sm flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'translate-x-[32px] bg-accent-violet text-dark-bg' : 'translate-x-0 bg-primary-text text-primary-bg'
                            }`}
                    >
                        {isDark ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* Mobile: Menu + Theme Toggle */}
            <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                {/* Mobile Theme Toggle Pill */}
                <button
                    onClick={() => setIsDark(prev => !prev)}
                    className="relative w-14 h-7 rounded-full bg-primary-text/5 border border-primary-text/20 flex items-center px-1 transition-colors duration-300"
                    aria-label="Toggle dark mode"
                >
                    <div
                        className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark ? 'translate-x-7 bg-accent-violet text-dark-bg' : 'translate-x-0 bg-primary-text text-primary-bg'
                            }`}
                    >
                        {isDark ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        )}
                    </div>
                </button>
                <button
                    onClick={toggleMenu}
                    className="bg-accent-violet text-dark-bg border-none px-5 py-2.5 rounded-full font-body text-xs font-semibold tracking-widest uppercase cursor-pointer shadow-sm"
                >
                    Menu
                </button>
            </div>
        </header>
    );
};

export default Header;
