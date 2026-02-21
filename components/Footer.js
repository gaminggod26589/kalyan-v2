/**
 * Footer.js — Site footer
 *
 * 3-column layout:
 *  1. Brand description + social links
 *  2. Quick navigation links
 *  3. Contact info (address, phone, hours)
 *
 * Responsive: stacks vertically on mobile
 */

import Link from "next/link";

/* Social icon SVGs as components */
const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);
const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.529 5.855L0 24l6.335-1.508A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.882 0-3.64-.497-5.161-1.367l-.366-.214-3.762.895.952-3.672-.237-.381A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
);

/* Footer quick links */
const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
];

/* Footer services links */
const SERVICES = [
    "Sports Injury Rehab",
    "Orthopaedic Physiotherapy",
    "Neurological Rehab",
    "Spine & Back Care",
    "Post-Surgical Recovery",
    "Pediatric Physio",
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0d2b2e] text-white">

            {/* ── Main Footer Content ── */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Column 1 — Brand */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#0d7377] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" opacity="0.9" />
                                <path d="M10 9h2V7h2v2h2v2h-2v2h-2v-2h-2V9z" fill="white" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-lg leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
                                Kalyan Physiotherapy
                            </p>
                            <p className="text-[10px] text-white/50 tracking-widest uppercase">
                                Expert Care & Rehab
                            </p>
                        </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                        Providing compassionate, evidence-based physiotherapy to help you
                        recover faster, move better, and live pain-free in Kalyan, Maharashtra.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-3">
                        {[
                            { icon: <FacebookIcon />, label: "Facebook", href: "#" },
                            { icon: <InstagramIcon />, label: "Instagram", href: "#" },
                            { icon: <WhatsAppIcon />, label: "WhatsApp", href: "#" },
                        ].map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#0d7377] hover:text-white transition-all duration-200"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Column 2 — Quick Links */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-5">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        {QUICK_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-white/65 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377] group-hover:bg-[#e3a832] transition-colors" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 — Services */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-5">
                        Our Services
                    </h3>
                    <ul className="space-y-3">
                        {SERVICES.map((s) => (
                            <li key={s}>
                                <Link
                                    href="/services"
                                    className="text-white/65 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7377] group-hover:bg-[#e3a832] transition-colors" />
                                    {s}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4 — Contact Info */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-5">
                        Contact Us
                    </h3>
                    <ul className="space-y-4">
                        {/* Address */}
                        <li className="flex gap-3 text-white/65 text-sm">
                            <svg className="shrink-0 mt-0.5 text-[#0d7377]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Near Railway Station, Kalyan West,<br />Thane – 421301, Maharashtra</span>
                        </li>
                        {/* Phone */}
                        <li className="flex gap-3 text-white/65 text-sm">
                            <svg className="shrink-0 text-[#0d7377]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
                            </svg>
                            <a href="tel:+912512345678" className="hover:text-white transition-colors">
                                +91 251 234 5678
                            </a>
                        </li>
                        {/* Email */}
                        <li className="flex gap-3 text-white/65 text-sm">
                            <svg className="shrink-0 text-[#0d7377]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                            </svg>
                            <a href="mailto:info@kalyanphysio.in" className="hover:text-white transition-colors">
                                info@kalyanphysio.in
                            </a>
                        </li>
                        {/* Hours */}
                        <li className="flex gap-3 text-white/65 text-sm">
                            <svg className="shrink-0 text-[#0d7377]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div>
                                <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                                <p>Sun: 10:00 AM – 2:00 PM</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/40 text-xs">
                        © {currentYear} Kalyan Physiotherapy. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs">
                        Designed with ❤️ for better health
                    </p>
                </div>
            </div>
        </footer>
    );
}
