import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../services/api';

export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        api.get('/admin/user')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) {
        return <div className="min-h-screen flex items-center justify-center bg-[#050507] text-white">Verifying session...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/manage-luqman" replace />;
}