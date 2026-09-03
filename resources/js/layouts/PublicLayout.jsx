import React, { useState, useEffect } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

export default function PublicLayout() {
    const location = useLocation();
    const currentOutlet = useOutlet();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/projects', label: 'Projects', num: '01' },
        { path: '/about', label: 'About', num: '02' },
        { path: '/contact', label: 'Contact', num: '03' }
    ];

    // Automatically close the mobile menu when the route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-500 relative">
            
            {/* The Precision Crosshairs */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M19 19V0H21V19H40V21H21V40H19V21H0V19H19Z\' fill=\'%23808080\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")' }}></div>

            <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-b border-zinc-200 dark:border-white/5 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
                    
                    {/* The Logo Flip Effect */}
                    <Link to="/" className="group relative z-50 block h-8 overflow-hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-8">
                            <span className="h-8 flex items-center text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">
                                Luqman.
                            </span>
                            <span className="h-8 flex items-center text-sm font-bold tracking-widest text-zinc-400 dark:text-zinc-600 uppercase">
                                [ Home ]
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-6 relative z-50">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex gap-1 relative">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative px-5 py-2.5 group flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                                    >
                                        <span className={`relative z-10 text-[10px] transition-colors duration-300 ${isActive ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400'}`}>
                                            {item.num}
                                        </span>
                                        <span className="relative z-10">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-highlight"
                                                className="absolute inset-0 bg-zinc-100 dark:bg-white/10 z-0"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                        
                        <div className="w-px h-6 bg-zinc-200 dark:bg-white/10 hidden md:block mx-2"></div>
                        <ThemeToggle />

                        {/* Mobile Menu Toggle Button */}
                        <button 
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            <span className={`block w-6 h-0.5 bg-zinc-900 dark:bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-zinc-900 dark:bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-6 h-0.5 bg-zinc-900 dark:bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col gap-8 text-center">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="group flex flex-col items-center gap-2"
                                    >
                                        <span className="text-sm font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                                            {item.num}
                                        </span>
                                        <span className={`text-4xl font-bold tracking-tighter transition-colors duration-300 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white'}`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow pt-32 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {currentOutlet}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="py-12 text-center text-zinc-500 dark:text-zinc-600 text-sm border-t border-zinc-200 dark:border-white/5 mt-20 transition-colors duration-500 relative z-10 px-6">
                <p>© {new Date().getFullYear()} Luqmanul Hakim. Engineered from scratch.</p>
            </footer>
        </div>
    );
}