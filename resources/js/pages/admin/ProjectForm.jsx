import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../services/api';

export default function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        title: '', slug: '', short_description: '', description: '',
        role: '', project_date: '', github_url: '', live_url: '',
        status: 'draft', featured: false,
    });
    
    // New state to hold the actual File object
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [currentThumbnail, setCurrentThumbnail] = useState(null);
    
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            api.get(`/admin/projects/${id}`)
                .then(res => {
                    const p = res.data;
                    setFormData({
                        title: p.title || '', slug: p.slug || '', short_description: p.short_description || '',
                        description: p.description || '', role: p.role || '', project_date: p.project_date || '',
                        github_url: p.github_url || '', live_url: p.live_url || '',
                        status: p.status || 'draft', featured: p.featured || false,
                    });
                    setCurrentThumbnail(p.thumbnail);
                    setLoading(false);
                })
                .catch(err => navigate('/manage-luqman/projects'));
        }
    }, [id, navigate, isEditing]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const val = type === 'checkbox' ? checked : value;
        let newFormData = { ...formData, [name]: val };
        
        if (name === 'title' && !isEditing) {
            newFormData.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        setFormData(newFormData);
    };

    const handleFileChange = (e) => {
        setThumbnailFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        const payload = new FormData();
        
        // Append all fields, safely converting the boolean to 1 or 0
        Object.keys(formData).forEach(key => {
            if (key === 'featured') {
                payload.append(key, formData[key] ? 1 : 0);
            } else if (formData[key] !== null && formData[key] !== '') {
                payload.append(key, formData[key]);
            }
        });

        // Append the file if one was selected
        if (thumbnailFile) {
            payload.append('thumbnail', thumbnailFile);
        }

        // Spoof the PUT method for Laravel to handle multipart/form-data updates
        if (isEditing) {
            payload.append('_method', 'PUT');
        }

        try {
            const endpoint = isEditing ? `/admin/projects/${id}` : '/admin/projects';
            await api.post(endpoint, payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/manage-luqman/projects');
        } catch (err) {
            if (err.response?.status === 422) {
                const msgs = Object.values(err.response.data.errors).flat().join('\n');
                alert(`Validation Failed:\n${msgs}`);
            } else {
                alert('Failed to save project.');
            }
            setSaving(false);
        }
    };
    
    if (loading) return <div className="text-zinc-500 p-10">Loading...</div>;

    return (
        <div className="max-w-3xl">
            <header className="mb-10">
                <Link to="/manage-luqman/projects" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2 inline-block">← Back</Link>
                <h1 className="text-3xl font-bold dark:text-white">{isEditing ? 'Edit Project' : 'New Project'}</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 border border-zinc-200 dark:border-white/10 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Thumbnail Upload Area */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Project Thumbnail</label>
                        {currentThumbnail && (
                            <img src={currentThumbnail} alt="Current" className="w-32 h-24 object-cover rounded-lg mb-4 border border-zinc-200 dark:border-white/10" />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-white/10 dark:file:text-zinc-300 dark:hover:file:bg-white/20 transition-colors cursor-pointer" />
                    </div>

                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Short Description</label><textarea name="short_description" value={formData.short_description} onChange={handleChange} required rows="2" className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white"></textarea></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Full Content</label><textarea name="description" value={formData.description} onChange={handleChange} required rows="6" className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white"></textarea></div>
                    
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Role</label><input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Date</label><input type="date" name="project_date" value={formData.project_date} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">GitHub URL</label><input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    <div><label className="block text-sm font-medium dark:text-zinc-300 mb-1">Live URL</label><input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white" /></div>
                    
                    <div>
                        <label className="block text-sm font-medium dark:text-zinc-300 mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 dark:text-white">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="flex items-center mt-6">
                        <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900" />
                        <label htmlFor="featured" className="ml-2 text-sm dark:text-zinc-300">Feature on Homepage</label>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-white/10 flex justify-end gap-4">
                    <button type="submit" disabled={saving} className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}