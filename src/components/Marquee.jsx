const Marquee = () => {
    const text = "✿ graphic designer ✿ ui/ux ✿ figma expert";
    const repeatedText = Array(4).fill(text).join('');

    return (
        <div className="w-full overflow-hidden py-8 sm:py-12 md:py-20 relative z-10 flex">
            <style>
                {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marqueeScroll 25s linear infinite;
          }
        `}
            </style>

            <div className="flex w-max animate-marquee">
                <span className="font-display text-[32px] sm:text-[48px] md:text-[80px] lg:text-[100px] uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap px-4 sm:px-6 md:px-8 text-primary-text">
                    {repeatedText.split('✿').map((segment, i, arr) => (
                        <span key={i}>
                            {segment}
                            {i < arr.length - 1 && <span className="text-accent-violet text-[0.7em] align-middle px-1 sm:px-2">✿</span>}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default Marquee;
