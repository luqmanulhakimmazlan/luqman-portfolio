import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Imports
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Projects from './pages/Projects'; // Public all-works page
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';

// Admin Imports
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProjectsList from './pages/admin/ProjectsList'; // CMS Table
import ProjectForm from './pages/admin/ProjectForm';
import ExperiencesList from './pages/admin/ExperiencesList';
import ExperienceForm from './pages/admin/ExperienceForm';
import SkillsList from './pages/admin/SkillsList';
import SkillForm from './pages/admin/SkillForm';
import Contact from './pages/Contact';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC WEBSITE (No Sidebar) */}
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:slug" element={<ProjectDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* SECRET CMS LOGIN */}
                <Route path="/manage-luqman" element={<Login />} />

                {/* PROTECTED ADMIN SHELL (With Sidebar) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/manage-luqman/dashboard" element={<Dashboard />} />
                        
                        {/* Projects CMS */}
                        <Route path="/manage-luqman/projects" element={<ProjectsList />} />
                        <Route path="/manage-luqman/projects/create" element={<ProjectForm />} />
                        <Route path="/manage-luqman/projects/:id/edit" element={<ProjectForm />} />
                        
                        {/* Experiences CMS */}
                        <Route path="/manage-luqman/experiences" element={<ExperiencesList />} />
                        <Route path="/manage-luqman/experiences/create" element={<ExperienceForm />} />
                        <Route path="/manage-luqman/experiences/:id/edit" element={<ExperienceForm />} />

                        {/* Skills CMS */}
                        <Route path="/manage-luqman/skills" element={<SkillsList />} />
                        <Route path="/manage-luqman/skills/create" element={<SkillForm />} />
                        <Route path="/manage-luqman/skills/:id/edit" element={<SkillForm />} />

                        <Route path="/manage-luqman" element={<Navigate to="/manage-luqman/dashboard" replace />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('root');
if (container) {
    if (!container._reactRootContainer) {
        const root = createRoot(container);
        container._reactRootContainer = root;
        root.render(<App />);
    }
}