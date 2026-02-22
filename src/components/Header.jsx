import { useState } from 'react';

const Header = ({ toggleMenu }) => {
    const [activeSection, setActiveSection] = useState('home');

    const handleNavClick = (e, section) => {
        e.preventDefault();
        setActiveSection(section);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-6 z-40 bg-transparent pointer-events-none">
            {/* Left Logo */}
            <div className="font-display text-2xl lowercase tracking-wider pointer-events-auto text-accent-violet">
                mb.
            </div>

            {/* Right Pill Navigation container */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 shadow-sm rounded-full p-1.5 pointer-events-auto transition-all">
                {['home', 'projects', 'about', 'contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item}`}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`px-6 py-2 rounded-full font-body text-sm font-semibold tracking-wide transition-colors duration-300 capitalize ${activeSection === item
                            ? 'bg-accent-violet text-dark-bg'
                            : 'text-primary-text hover:bg-white/10 font-medium'
                            }`}
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Button  */}
            <button
                onClick={toggleMenu}
                className="md:hidden bg-accent-violet text-dark-bg border-none px-5 py-2.5 rounded-full font-body text-xs font-semibold tracking-widest uppercase cursor-pointer pointer-events-auto shadow-sm"
            >
                Menu
            </button>
        </header>
    );
};

export default Header;
