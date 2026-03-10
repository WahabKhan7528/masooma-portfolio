/**
 * Shared character-split reveal component.
 * Used by Experience, Process, Projects, and Contact for scroll-triggered text animations.
 * 
 * @param {string} children - Text to split into characters
 * @param {string} className - Additional CSS classes
 * @param {string} charClass - CSS class applied to each character span (used by GSAP selectors)
 */
const CharReveal = ({ children, className = '', charClass = 'char-reveal' }) => {
    const chars = children.split('');
    return (
        <span className={className}>
            {chars.map((char, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <span
                        className={`${charClass} inline-block`}
                        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

export default CharReveal;
