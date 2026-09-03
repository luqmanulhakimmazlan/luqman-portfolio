import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function About() {
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const [expRes, skillsRes] = await Promise.all([
                    api.get('/public/experiences'),
                    api.get('/public/skills')
                ]);
                
                setExperiences(Array.isArray(expRes.data) ? expRes.data : []);
                setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-32">
            <header className="mb-32">
                <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 dark:text-white mb-10 tracking-tighter">
                    About.
                </h1>
                <div className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-8 font-light">
                    <p>
                        I’m a fresh Computer Science graduate from Malaysia who enjoys turning ideas into practical and meaningful digital experiences. I’m particularly interested in the space between development and design — understanding how things work behind the scenes while also thinking about how people experience what I build.
                    </p>
                    <p>
                       I enjoy exploring new technologies, solving problems, and experimenting with different ways to make software more intuitive and engaging. I may not know everything yet, but I genuinely enjoy learning, figuring things out, and improving with every project I take on.
                    </p>
                </div>
            </header>

            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
                        Experience
                    </h2>
                    <div className="h-px flex-grow bg-zinc-200 dark:bg-white/10"></div>
                </div>
                
                {loading ? (
                    <div className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-sm">Loading timeline...</div>
                ) : experiences.length === 0 ? (
                    <div className="text-zinc-500">No experiences listed yet.</div>
                ) : (
                    <div className="space-y-20">
                        {experiences.map(exp => (
                            <div key={exp.id} className="grid md:grid-cols-4 gap-8 group">
                                <div className="text-zinc-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest pt-2">
                                    {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
                                        {exp.position}
                                    </h3>
                                    <div className="text-lg text-zinc-500 dark:text-zinc-400 font-medium mb-6">
                                        {exp.company}
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-light">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-white">
                        Technologies
                    </h2>
                    <div className="h-px flex-grow bg-zinc-200 dark:bg-white/10"></div>
                </div>
                
                {loading ? (
                    <div className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-sm">Loading skills...</div>
                ) : skills.length === 0 ? (
                    <div className="text-zinc-500">No skills listed yet.</div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => (
                            <span key={skill.id} className="px-5 py-3 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:border-zinc-900 dark:hover:border-white hover:text-zinc-900 dark:hover:text-white cursor-default">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}