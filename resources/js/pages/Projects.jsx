import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/projects')
            .then(res => {
                setProjects(Array.isArray(res.data) ? res.data : (res.data?.data || []));
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-32">
            <header className="mb-24">
                <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter">
                    Projects.
                </h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl">
                    A complete index of my software development and projects.
                </p>
            </header>

            {loading ? (
                <div className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-sm">Loading projects...</div>
            ) : (
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                    {projects.map(project => (
                        <Link 
                            key={project.id} 
                            to={`/projects/${project.slug}`} 
                            className="group block relative"
                        >
                            <div className={`p-8 border transition-all duration-500 h-full ${project.featured ? 'border-zinc-300 dark:border-white/20 bg-zinc-50 dark:bg-white/5 group-hover:border-zinc-900 dark:group-hover:border-white/60' : 'border-zinc-200 dark:border-white/10 group-hover:border-zinc-400 dark:group-hover:border-white/30'}`}>
                                
                                <div className="flex justify-between items-start mb-16">
                                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                        {project.title}
                                    </h3>
                                    {project.featured && (
                                        <span className="px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                
                                <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                                    {project.short_description}
                                </p>

                                <div className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white flex items-center mt-auto">
                                    Read Project 
                                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}