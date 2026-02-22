const Header = ({ toggleMenu }) => {
    return (
        <header className="fixed top-0 left-0 w-full flex justify-between items-start px-5 md:px-10 py-6 z-40 bg-transparent mix-blend-difference text-primary-bg">
            <div className="flex flex-col gap-0 uppercase tracking-[3px] text-[10px] font-medium font-body leading-relaxed">
                <span>Portfolio of</span>
                <span>Masooma</span>
            </div>
            <button
                onClick={toggleMenu}
                className="bg-white text-primary-text border-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-body text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase cursor-pointer transition-transform duration-400 ease-custom hover:scale-105 shadow-[0_2px_12px_rgba(0,0,0,0.06)] mix-blend-normal"
            >
                Menu
            </button>
        </header>
    );
};

export default Header;
