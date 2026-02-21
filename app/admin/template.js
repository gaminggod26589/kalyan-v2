"use client";

import { useState, useEffect } from "react";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function AdminLayoutInner({ children }) {
    const { user, loading, logout, isOwner } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (!loading && !user && !isLoginPage) {
            router.push("/admin/login");
        }
        if (!loading && user && pathname === "/admin/users" && !isOwner) {
            router.push("/admin/dashboard");
        }
    }, [user, loading, isLoginPage, router, pathname, isOwner]);

    // Close mobile menu when clicking a link
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isLoginPage || !user) {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    const navLinks = [
        { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
        { name: "Appointments", href: "/admin/appointments", icon: "📅" },
        { name: "Messages", href: "/admin/messages", icon: "📬" },
    ];

    if (isOwner) {
        navLinks.push({ name: "Staff Users", href: "/admin/users", icon: "👥" });
    }

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-serif font-bold text-teal-900">Kalyan Admin</h2>
                <span className="text-xs inline-block mt-2 px-2 py-1 bg-teal-100 text-teal-800 rounded-full font-medium">
                    Role: {user.role}
                </span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-teal-50 text-teal-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span className="mr-3 text-lg">{link.icon}</span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span className="mr-3">🚪</span>
                    Log Out
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex md:flex-col shadow-sm">
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">

                {/* Mobile Header with Hamburger */}
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center z-20 relative">
                    <h2 className="font-bold text-teal-900 flex items-center gap-2">
                        {/* Hamburger Icon */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-1 -ml-1 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                {isMobileMenuOpen
                                    ? <g><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></g>
                                    : <g><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></g>
                                }
                            </svg>
                        </button>
                        Kalyan Admin
                    </h2>

                    {/* User profile minimal indicator */}
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs uppercase">
                        {user.name.charAt(0)}
                    </div>
                </header>

                {/* Mobile Dropdown Sidebar (Absolute positioned) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="md:hidden absolute inset-0 bg-black/50 z-10"
                            />

                            {/* Sliding Menu */}
                            <motion.aside
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.3 }}
                                className="md:hidden absolute top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col shadow-xl z-20"
                            >
                                <div className="absolute top-4 right-4 text-gray-400">
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <SidebarContent />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

export default function AdminClientWrapper({ children }) {
    return (
        <AuthProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AuthProvider>
    );
}
