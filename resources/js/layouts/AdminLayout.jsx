import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await api.post('/logout', {}, { baseURL: '' });
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/manage-luqman/dashboard' },
        { name: 'Projects', path: '/manage-luqman/projects' },
        { name: 'Experience', path: '/manage-luqman/experiences' },
        { name: 'Skills', path: '/manage-luqman/skills' },
        { name: 'Settings', path: '/manage-luqman/settings' },
    ];

    return (
        <div className="min-h-screen flex bg-zinc-50 dark:bg-[#050507] text-zinc-900 dark:text-zinc-300 transition-colors duration-500">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-white/5 border-r border-zinc-200 dark:border-white/10 flex flex-col transition-colors duration-500">
                <div className="h-20 flex items-center px-8 border-b border-zinc-200 dark:border-white/10">
                    <span className="text-xl font-bold dark:text-white">CMS Admin</span>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map(item => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link 
                                key={item.name} 
                                to={item.path}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white' : 'hover:bg-zinc-50 dark:hover:bg-white/5'}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-zinc-200 dark:border-white/10">
                    <a href="/" target="_blank" rel="noreferrer" className="block w-full text-center px-4 py-2 mb-2 bg-zinc-100 dark:bg-white/10 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors">
                        View Live Site ↗
                    </a>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}