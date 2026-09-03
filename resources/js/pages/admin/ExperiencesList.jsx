import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function ExperiencesList() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = () => {
        api.get('/admin/experiences')
            .then(res => { 
                // Ensure the response is actually an array before saving it
                if (Array.isArray(res.data)) {
                    setExperiences(res.data); 
                } else {
                    console.error("API did not return an array. It might have returned HTML.");
                    setExperiences([]);
                }
                setLoading(false); 
            })
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchExperiences(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this experience?')) {
            await api.delete(`/admin/experiences/${id}`);
            fetchExperiences();
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold dark:text-white">Experiences</h1>
                <Link to="/manage-luqman/experiences/create" className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200">
    + New Experience
                </Link>
            </header>

            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 text-zinc-500 text-xs uppercase">
                            <th className="px-6 py-4">Position</th>
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">Timeline</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                        {loading ? <tr><td colSpan="4" className="px-6 py-8 text-center text-zinc-500">Loading...</td></tr> : 
                        experiences.map(exp => (
                            <tr key={exp.id} className="hover:bg-zinc-50 dark:hover:bg-white/5">
                                <td className="px-6 py-4 font-medium dark:text-white">{exp.position}</td>
                                <td className="px-6 py-4 dark:text-zinc-300">{exp.company}</td>
                                <td className="px-6 py-4 dark:text-zinc-400">{exp.start_date} - {exp.end_date || 'Present'}</td>
                                <td className="px-6 py-4 text-right">
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link to={`/manage-luqman/experiences/${exp.id}/edit`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">Edit</Link>
                                        <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                    </td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}