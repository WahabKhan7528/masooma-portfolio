const Availability = () => {
    return (
        <section className="w-full pb-12 px-8 flex justify-center bg-primary-bg">
            <div className="inline-flex items-center gap-4 bg-primary-text/5 border border-[#A58BFF]/30 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <p className="font-body text-xs sm:text-sm tracking-[2px] uppercase text-primary-text/80 font-bold">
                    Available for freelance opportunities
                </p>
            </div>
        </section>
    );
};

export default Availability;
