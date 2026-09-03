import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function SkillForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({ name: '', category: '' });
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            api.get(`/admin/skills/${id}`)
                .then(res => {
                    setFormData({
                        name: res.data.name || '',
                        category: res.data.category || '',
                    });
                    setLoading(false);
                })
                .catch(() => navigate('/manage-luqman/skills'));
        }
    }, [id, navigate, isEditing]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEditing) {
                await api.put(`/admin/skills/${id}`, formData);
            } else {
                await api.post('/admin/skills', formData);
            }
            navigate('/manage-luqman/skills');
        } catch (err) {
            alert('Failed to save skill.');
            setSaving(false);
        }
    };

    if (loading) return <div className="text-zinc-500 p-10">Loading...</div>;

    return (
        <div className="max-w-xl">
            <header className="mb-10">
                <Link to="/manage-luqman/skills" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2 inline-block">← Back to Skills</Link>
                <h1 className="text-3xl font-bold dark:text-white">{isEditing ? 'Edit Skill' : 'New Skill'}</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 border border-zinc-200 dark:border-white/10 rounded-xl">
                <div>
                    <label className="block text-sm font-medium dark:text-zinc-300 mb-1">Skill Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., CodeIgniter 4, Firebase Studio, React" required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium dark:text-zinc-300 mb-1">Category (Optional)</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Backend, Frontend, Agentic AI, Game Development" className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" />
                </div>
                <div className="pt-6 flex justify-end">
                    <button type="submit" disabled={saving} className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Skill'}
                    </button>
                </div>
            </form>
        </div>
    );
}