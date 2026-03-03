import { memo, useMemo } from 'react';

const text = "✿ Figma Expert ✿ UI Designer ✿ Visual Designer ✿ Design Systems Creator ✿ Wireframe Architect ✿ Prototype Specialist ✿ Brand Designer ✿ Interaction Designer ✿ Creative Strategist";

const Marquee = memo(() => {
    const segments = useMemo(() => {
        const repeatedText = Array(4).fill(text).join('');
        return repeatedText.split('✿');
    }, []);

    return (
        <div className="w-full overflow-hidden py-8 sm:py-12 md:py-20 relative z-10 flex">
            <div className="flex w-max animate-marquee">
                <span className="font-display text-[32px] sm:text-[48px] md:text-[80px] lg:text-[100px] uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap px-4 sm:px-6 md:px-8 text-primary-text">
                    {segments.map((segment, i, arr) => (
                        <span key={i}>
                            {segment}
                            {i < arr.length - 1 && <span className="text-accent-violet text-[0.7em] align-middle px-1 sm:px-2">✿</span>}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
});

Marquee.displayName = 'Marquee';

export default Marquee;
