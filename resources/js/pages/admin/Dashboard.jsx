import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-white mb-10 transition-colors duration-500">Overview</h1>
            
            <div className="grid md:grid-cols-4 gap-6">
                <div className="p-6 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl transition-colors duration-500">
                    <h3 className="text-zinc-500 dark:text-zinc-400 font-medium mb-2">Total Projects</h3>
                    <p className="text-4xl font-bold dark:text-white">--</p>
                </div>
            </div>
        </div>
    );
}