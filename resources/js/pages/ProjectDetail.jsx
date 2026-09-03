import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
    <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 mb-20 overflow-hidden relative border border-zinc-200 dark:border-white/10 transition-colors duration-500">
        <img 
            src={project.thumbnail?.startsWith('/') ? project.thumbnail : `/${project.thumbnail}`} 
            alt={project.title} 
            className="w-full h-full object-contain p-4" 
        />
    </div>
)}

            <article className="prose prose-zinc dark:prose-invert max-w-none transition-colors duration-500 prose-headings:font-bold prose-headings:tracking-tight prose-p:font-light prose-p:leading-relaxed prose-p:text-lg">
                <div className="whitespace-pre-wrap">
                    {project.description}
                </div>
            </article>
        </div>
    );
}