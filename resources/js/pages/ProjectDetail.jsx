import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        api.get(`/public/projects/${slug}`)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    // Reusing the date formatter from the About page
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    if (loading) return <div className="max-w-4xl mx-auto px-6 py-32 text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-sm">Loading case study...</div>;
    
    if (error || !project) return (
        <div className="max-w-4xl mx-auto px-6 py-32">
            <h1 className="text-3xl font-bold dark:text-white mb-4">Project not found.</h1>
            <Link to="/projects" className="text-blue-500 hover:underline">Return to all works</Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-32">
            <Link to="/projects" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-16 inline-block transition-colors">
                ← Back to Archive
            </Link>
            
            <header className="mb-16">
                <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter transition-colors duration-500">
                    {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 font-light">
                    {project.short_description}
                </p>
                
                <div className="flex flex-wrap gap-12 text-sm border-y border-zinc-200 dark:border-white/10 py-8 transition-colors duration-500">
                    {project.role && (
                        <div>
                            <span className="text-zinc-400 dark:text-zinc-500 block mb-2 font-bold uppercase tracking-widest text-[10px]">Role</span>
                            <span className="dark:text-white font-medium">{project.role}</span>
                        </div>
                    )}
                    {project.project_date && (
                        <div>
                            <span className="text-zinc-400 dark:text-zinc-500 block mb-2 font-bold uppercase tracking-widest text-[10px]">Timeline</span>
                            {/* Applied the formatter here */}
                            <span className="dark:text-white font-medium">{formatDate(project.project_date)}</span>
                        </div>
                    )}
                    
                    <div className="flex gap-4 ml-auto items-center">
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noreferrer" className="px-6 py-3 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:border-zinc-900 dark:hover:border-white transition-all duration-300">
                                Source Code
                            </a>
                        )}
                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                                View Live
                            </a>
                        )}
                    </div>
                </div>
            </header>

           {project.thumbnail && (
                <>
                    {/* The Clickable Preview Container */}
                    <div 
                        className="aspect-video bg-zinc-100 dark:bg-zinc-900 mb-20 overflow-hidden relative border border-zinc-200 dark:border-white/10 cursor-pointer group"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {/* object-top anchors the crop to the top of your screenshot */}
                        <img 
                            src={project.thumbnail?.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                        />
                        
                        {/* The Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-bold tracking-widest uppercase text-xs border border-white/50 px-6 py-3 rounded-full backdrop-blur-sm">
                                View Full Image
                            </span>
                        </div>
                    </div>

                    {/* The Fullscreen Lightbox Modal */}
                    {isModalOpen && (
                        <div 
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <img 
                                src={project.thumbnail?.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`} 
                                alt={project.title} 
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                            />
                            {/* Close Button */}
                            <button 
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}

            <article className="prose prose-zinc dark:prose-invert max-w-none transition-colors duration-500 prose-headings:font-bold prose-headings:tracking-tight prose-p:font-light prose-p:leading-relaxed prose-p:text-lg">
                <div className="whitespace-pre-wrap">
                    {project.description}
                </div>
            </article>
        </div>
    );
}