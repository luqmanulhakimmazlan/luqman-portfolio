import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        api.get('/admin/projects')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await api.delete(`/admin/projects/${id}`);
            fetchProjects();
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2 transition-colors duration-500">Projects</h1>
                    <p className="text-zinc-500">Manage your portfolio case studies.</p>
                </div>
                <Link to="/manage-luqman/projects/create" className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                    + New Project
                </Link>
            </header>

            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden transition-colors duration-500">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10">
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Featured</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-8 text-center text-zinc-500">Loading...</td></tr>
                        ) : projects.map(project => (
                            <tr key={project.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium dark:text-white">{project.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        project.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        project.status === 'draft' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                                    }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {project.featured ? '★ Yes' : '-'}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4 text-sm font-medium">
                                    <Link to={`/manage-luqman/projects/${project.id}/edit`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}