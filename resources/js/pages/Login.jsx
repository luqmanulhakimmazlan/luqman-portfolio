import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.get('/sanctum/csrf-cookie', { baseURL: '' });
            // Add { baseURL: '' } here to hit /login instead of /api/login
            await api.post('/login', { email, password }, { baseURL: '' }); 
            navigate('/manage-luqman/dashboard');
        } catch (err) {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#050507] transition-colors duration-500">
            <div className="max-w-md w-full px-6 py-12 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">CMS Access</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/50"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/50"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors mt-6"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}