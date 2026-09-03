import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function ExperienceForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        company: '',
        position: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        order: 0,
    });
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            api.get(`/admin/experiences/${id}`)
                .then(res => {
                    const exp = res.data;
                    setFormData({
                        company: exp.company || '',
                        position: exp.position || '',
                        location: exp.location || '',
                        start_date: exp.start_date || '',
                        end_date: exp.end_date || '',
                        description: exp.description || '',
                        order: exp.order || 0,
                    });
                    setLoading(false);
                })
                .catch(() => navigate('/manage-luqman/experiences'));
        }
    }, [id, navigate, isEditing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        const payload = { ...formData };
        if (payload.end_date === '') payload.end_date = null;

        try {
            if (isEditing) {
                await api.put(`/admin/experiences/${id}`, payload);
            } else {
                await api.post('/admin/experiences', payload);
            }
            navigate('/manage-luqman/experiences');
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save experience.');
            setSaving(false);
        }
    };

    if (loading) return <div className="text-zinc-500 p-10">Loading...</div>;

    return (
        <div className="max-w-3xl">
            <header className="mb-10">
                <Link to="/manage-luqman/experiences" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2 inline-block">← Back to Experiences</Link>
                <h1 className="text-3xl font-bold dark:text-white">{isEditing ? 'Edit Experience' : 'New Experience'}</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 border border-zinc-200 dark:border-white/10 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Position / Role</label><input type="text" name="position" value={formData.position} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Location</label> <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Start Date (e.g. Jan 2025)</label><input type="text" name="start_date" value={formData.start_date} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">End Date (Leave empty for Present)</label><input type="text" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    
                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Description</label><textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white"></textarea></div>
                    
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Display Order</label><input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-white/10 flex justify-end gap-4">
                    <button type="submit" disabled={saving} className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
}