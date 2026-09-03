import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function SkillsList() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = () => {
        api.get('/admin/skills')
            .then(res => { 
                if (Array.isArray(res.data)) setSkills(res.data);
                setLoading(false); 
            })
            .catch(err => console.error(err));
    };

    useEffect(() => { fetchSkills(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this skill?')) {
            await api.delete(`/admin/skills/${id}`);
            fetchSkills();
        }
    };

    return (
        <div className="max-w-4xl">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold dark:text-white">Skills</h1>
                <Link to="/manage-luqman/skills/create" className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200">
                    + New Skill
                </Link>
            </header>

            <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 text-zinc-500 text-xs uppercase">
                            <th className="px-6 py-4">Skill Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                        {loading ? <tr><td colSpan="3" className="px-6 py-8 text-center text-zinc-500">Loading...</td></tr> : 
                        skills.map(skill => (
                            <tr key={skill.id} className="hover:bg-zinc-50 dark:hover:bg-white/5">
                                <td className="px-6 py-4 font-medium dark:text-white">{skill.name}</td>
                                <td className="px-6 py-4 dark:text-zinc-400">{skill.category || '-'}</td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <Link to={`/manage-luqman/skills/${skill.id}/edit`} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium">Edit</Link>
                                    <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}