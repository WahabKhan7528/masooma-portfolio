import { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = memo(() => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use quickTo for high-frequency mousemove — reuses a single tween instead of creating 60/s
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

        const moveCursor = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        // Grow cursor on interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 });
            }
        };

        const handleMouseOut = () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-primary-text rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block transform -translate-x-1/2 -translate-y-1/2"
        ></div>
    );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
