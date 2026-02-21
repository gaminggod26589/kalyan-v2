/**
 * Navbar.js — Sticky navigation bar
 *
 * Features:
 * - Transparent when at page top, solid white with shadow when scrolled
 * - Mobile hamburger menu with slide-in drawer (Framer Motion)
 * - Active link highlighting using usePathname
 */

"use client"; // Required for hooks (useState, useEffect) and Framer Motion

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* Navigation links shared between desktop and mobile */
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();          // Current route
    const [scrolled, setScrolled] = useState(false);  // Has user scrolled?
    const [menuOpen, setMenuOpen] = useState(false);  // Mobile menu state

    /* Listen for scroll to toggle background */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Close mobile menu when route changes */
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    /* Determine if a link is the active page */
    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* ── Brand Logo ── */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-lg bg-[#0d7377] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" opacity="0.9" />
                                <path d="M10 9h2V7h2v2h2v2h-2v2h-2v-2h-2V9z" fill="white" />
                            </svg>
                        </div>
                        {/* Text */}
                        <div>
                            <span
                                className={`text-lg font-bold leading-tight block transition-colors ${scrolled ? "text-[#0d7377]" : "text-white"
                                    }`}
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                Kalyan
                            </span>
                            <span
                                className={`text-[10px] font-semibold tracking-widest uppercase block leading-none transition-colors ${scrolled ? "text-[#5a7375]" : "text-white/75"
                                    }`}
                            >
                                Physiotherapy
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop Nav Links ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                                    ? scrolled
                                        ? "text-[#0d7377] bg-[#0d7377]/10 font-semibold"
                                        : "text-white bg-white/20 font-semibold"
                                    : scrolled
                                        ? "text-[#1a2e35] hover:text-[#0d7377] hover:bg-[#0d7377]/08"
                                        : "text-white/85 hover:text-white hover:bg-white/15"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Desktop CTA Button ── */}
                    <Link
                        href="/appointments"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#e3a832] text-white shadow-sm hover:bg-[#c08a1e] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Book Now
                    </Link>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#1a2e35] hover:bg-gray-100" : "text-white hover:bg-white/15"
                            }`}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            animate={menuOpen ? "open" : "closed"}
                            className="w-6 h-4 flex flex-col justify-between"
                        >
                            <motion.span
                                variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
                                transition={{ duration: 0.2 }}
                                className="block h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                                transition={{ duration: 0.2 }}
                                className="block h-0.5 bg-current rounded-full"
                            />
                            <motion.span
                                variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
                                transition={{ duration: 0.2 }}
                                className="block h-0.5 bg-current rounded-full"
                            />
                        </motion.div>
                    </button>
                </div>
            </header>

            {/* ── Mobile Slide-In Drawer ── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#0d7377]">
                                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                                    Kalyan Physio
                                </span>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.href)
                                                ? "text-[#0d7377] bg-[#0d7377]/10 font-semibold"
                                                : "text-[#1a2e35] hover:text-[#0d7377] hover:bg-gray-50"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Drawer CTA */}
                            <div className="px-6 pb-8">
                                <Link
                                    href="/appointments"
                                    className="block w-full text-center py-3 rounded-xl bg-[#0d7377] text-white font-semibold text-sm hover:bg-[#085f63] transition-colors"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
