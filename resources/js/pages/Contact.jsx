import React from 'react';

export default function Contact() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-32">
            <header className="mb-24">
                <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter">
                    Contact.
                </h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-light leading-relaxed">
                    Whether you have a project in mind, a role to discuss, or just want to talk software development, feel free to reach out.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-16 border-t border-zinc-200 dark:border-white/10 pt-16">
                
                {/* Left Column: Status & Details */}
                <div className="space-y-16">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                            Current Status
                        </h2>
                        <p className="text-lg text-zinc-900 dark:text-zinc-300 leading-relaxed font-medium">
                            Finishing my final year as a software development student and wrapping up my current internship. Actively exploring full-time engineering roles.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                            Location
                        </h2>
                        <p className="text-lg text-zinc-900 dark:text-zinc-300 leading-relaxed font-medium">
                            Malaysia <br />
                            <span className="text-zinc-500 dark:text-zinc-500 text-sm font-light">(MYT / UTC+8)</span>
                        </p>
                    </div>
                </div>

                {/* Right Column: Interactive Links */}
                <div className="flex flex-col gap-4">
                    <a 
    href="https://mail.google.com/mail/?view=cm&fs=1&to=luqmanulhakimmazlan@gmail.com" 
    target="_blank" 
    rel="noreferrer" 
    className="group flex justify-between items-center p-8 md:p-10 border border-zinc-200 dark:border-white/10 hover:border-zinc-900 dark:hover:border-white/60 bg-zinc-50/50 dark:bg-white/5 transition-all duration-500"
>
    <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            Email
        </span>
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mt-2 tracking-wide group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
            luqmanulhakimmazlan@gmail.com
        </span>
    </div>
    <span className="text-2xl text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transform group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500 font-light">
        ↗
    </span>
</a>
                    
                    {/* Update with your GitHub link */}
                    <a href="https://github.com/luqmanulhakimmazlan" target="_blank" rel="noreferrer" className="group flex justify-between items-center p-8 md:p-10 border border-zinc-200 dark:border-white/10 hover:border-zinc-900 dark:hover:border-white/60 bg-zinc-50/50 dark:bg-white/5 transition-all duration-500">
                        <span className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                            GitHub
                        </span>
                        <span className="text-2xl text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transform group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500 font-light">
                            ↗
                        </span>
                    </a>

                    {/* Update with your LinkedIn link */}
                    <a href="https://www.linkedin.com/in/luqmanul-hakim-bin-mazlan-1b44bb1aa/" target="_blank" rel="noreferrer" className="group flex justify-between items-center p-8 md:p-10 border border-zinc-200 dark:border-white/10 hover:border-zinc-900 dark:hover:border-white/60 bg-zinc-50/50 dark:bg-white/5 transition-all duration-500">
                        <span className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                            LinkedIn
                        </span>
                        <span className="text-2xl text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transform group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-500 font-light">
                            ↗
                        </span>
                    </a>
                </div>

            </div>
        </div>
    );
}