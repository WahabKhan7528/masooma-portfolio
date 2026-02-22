import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            // You can add more options here
            multiplier: 1,
            lerp: 0.05,
        });

        return () => {
            if (scroll) scroll.destroy();
        };
    }, []);

    return (
        <div data-scroll-container>
            {children}
        </div>
    );
};

export default SmoothScroll;
