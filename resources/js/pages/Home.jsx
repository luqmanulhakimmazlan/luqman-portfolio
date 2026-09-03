import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        api.get('/public/projects')
            .then(res => {
                let projectArray = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                const featured = projectArray.filter(p => p.featured === 1 || p.featured === true || p.featured === "1");
                setFeaturedProjects(featured);
            })
            .catch(err => console.error("Failed to fetch featured projects:", err));
    }, []);

    return (
        <div className="relative min-h-screen selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-zinc-300/30 dark:bg-white/5 blur-[120px] rounded-full opacity-70 mix-blend-normal transition-opacity duration-1000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                
                <section className="min-h-[90vh] flex flex-col justify-center items-start pt-20 pb-32">
                    <div className="space-y-2 mb-10">
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6 ml-1">
                            Software Developer
                        </p>
                        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-extrabold text-zinc-900 dark:text-white tracking-tighter leading-[0.85]">
                            LUQMAN.
                        </h1>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-400 dark:text-zinc-600 tracking-tight leading-none">
                            Building digital <br/> experiences.
                        </h2>
                    </div>
                    
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                        Focused on modern web applications, scalable backends, and intuitive user interfaces. Based in Malaysia.
                    </p>
                    
                    <div className="flex flex-wrap gap-8 items-center mt-4">
                        <Link to="/projects" className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs overflow-hidden rounded-none">
                            <span className="relative z-10">Explore Work</span>
                            <div className="absolute inset-0 h-full w-0 bg-zinc-700 dark:bg-zinc-200 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                        </Link>
                        
                        <a href="/Luqman_CV.pdf" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                            <span className="w-8 h-[1px] bg-zinc-900 dark:bg-white transition-all duration-300 group-hover:w-16"></span>
                            View Resume
                        </a>
                    </div>
                </section>

                <section className="py-32 border-t border-zinc-200 dark:border-white/10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-24 gap-6">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tighter">Featured<br/>Work.</h2>
                        </div>
                        <Link to="/projects" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            View Archive →
                        </Link>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                        {featuredProjects.length === 0 ? (
                            <p className="text-zinc-500">No featured projects found.</p>
                        ) : (
                            featuredProjects.map((project, index) => (
                                <Link key={project.id} to={`/projects/${project.slug}`} className={`group block ${index % 2 !== 0 ? 'md:mt-32' : ''}`}>
                                    
                                    {/* Changed aspect-[4/5] to aspect-video here */}
                                    <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 mb-8 overflow-hidden relative">
                                        {project.thumbnail ? (
                                            <img 
                                                src={project.thumbnail} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium tracking-widest uppercase text-sm">No Image</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
                                    </div>
                                    
                                    <div className="flex justify-between items-start border-t border-zinc-200 dark:border-white/10 pt-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors tracking-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                                                {project.short_description}
                                            </p>
                                        </div>
                                        <span className="text-2xl font-light text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-500">
                                            ↗
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}