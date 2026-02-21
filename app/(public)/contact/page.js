/**
 * Contact Page (/contact)
 *
 * Sections:
 *  1. Page Hero
 *  2. Contact Info Cards (address, phone, email, hours)
 *  3. Google Map embed + Contact message form (side by side)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

/* Contact info data */
const CONTACT_INFO = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Our Location",
        value: "Near Railway Station, Kalyan West, Thane – 421301, Maharashtra",
        link: "https://maps.google.com",
        linkLabel: "Get Directions",
        color: "#0d7377",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16z" />
            </svg>
        ),
        label: "Phone Number",
        value: "+91 251 234 5678",
        link: "tel:+912512345678",
        linkLabel: "Call Now",
        color: "#085f63",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email Address",
        value: "info@kalyanphysio.in",
        link: "mailto:info@kalyanphysio.in",
        linkLabel: "Send Email",
        color: "#0d7377",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: "Working Hours",
        value: "Mon–Fri: 9 AM–7 PM\nSat: 9 AM–5 PM\nSun: 10 AM–2 PM",
        link: "/appointments",
        linkLabel: "Book Online",
        color: "#085f63",
    },
];

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm(INITIAL_FORM);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <div className="overflow-hidden">

            {/* ── Page Hero ── */}
            <section className="pt-28 pb-16 relative" style={{ background: "var(--gradient-hero)" }}>
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                />
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Contact</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Get in Touch
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Have a question or want to schedule a visit? We'd love to hear from you — our team is here to help.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
                        <path d="M0 60L60 51.5C120 43 240 26 360 21C480 16 600 23 720 28C840 33 960 36 1080 33.5C1200 31 1320 23 1380 19L1440 15V60H0Z" fill="#f7fafa" />
                    </svg>
                </div>
            </section>

            {/* ── Contact Info Cards ── */}
            <section className="pt-16 pb-12 bg-[#f7fafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {CONTACT_INFO.map((info, i) => (
                            <AnimatedSection key={info.label} delay={i * 0.08}>
                                <div className="bg-white rounded-2xl border border-[#dde8e8] p-6 hover:shadow-md transition-shadow h-full flex flex-col">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: `${info.color}15`, color: info.color }}
                                    >
                                        {info.icon}
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#5a7375] mb-2">
                                        {info.label}
                                    </p>
                                    <p className="text-[#1a2e35] text-sm font-medium leading-relaxed flex-1 whitespace-pre-line">
                                        {info.value}
                                    </p>
                                    <a
                                        href={info.link}
                                        className="mt-4 text-[#0d7377] text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all"
                                    >
                                        {info.linkLabel}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </a>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Map + Contact Form ── */}
            <section className="pb-20 bg-[#f7fafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Google Maps Embed */}
                        <AnimatedSection direction="right">
                            <div className="bg-white rounded-2xl border border-[#dde8e8] overflow-hidden h-full min-h-[420px]">
                                <div
                                    className="p-5 border-b border-[#dde8e8] flex items-center gap-3"
                                    style={{ background: "var(--gradient-hero)" }}
                                >
                                    <svg className="text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span className="text-white font-semibold">Find Us on the Map</span>
                                </div>
                                {/* 
                  Replace the src URL below with your actual Google Maps embed link.
                  Go to maps.google.com → search your address → Share → Embed a map → Copy HTML → extract the src URL.
                */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.4!2d73.1292!3d19.2403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7959b4e5df23d%3A0x34b!2sKalyan+West%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1708000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "360px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Kalyan Physiotherapy Location"
                                />
                            </div>
                        </AnimatedSection>

                        {/* Contact Message Form */}
                        <AnimatedSection direction="left" delay={0.1}>
                            <div className="bg-white rounded-2xl border border-[#dde8e8] p-8 h-full">
                                <h2
                                    className="text-2xl font-bold text-[#1a2e35] mb-2"
                                    style={{ fontFamily: "var(--font-playfair)" }}
                                >
                                    Send Us a Message
                                </h2>
                                <p className="text-[#5a7375] text-sm mb-7">
                                    We typically respond within a few hours during working days.
                                </p>

                                {status === "success" ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                        <h3 className="font-bold text-[#1a2e35] text-xl mb-2">Message Sent!</h3>
                                        <p className="text-[#5a7375] text-sm mb-5">
                                            Thank you for reaching out. We'll get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="btn-primary px-6 py-3"
                                        >
                                            Send Another
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Your Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Rajesh Kumar"
                                                    className="form-input"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Phone (optional)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="you@example.com"
                                                className="form-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                placeholder="e.g. Enquiry about knee pain treatment"
                                                className="form-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Tell us how we can help you…"
                                                className="form-input resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="btn-primary w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {status === "loading" ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                    </svg>
                                                    Sending…
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                    </svg>
                                                    Send Message
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-white">
                <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#1a2e35] mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Ready to Start Your Recovery?
                    </h2>
                    <p className="text-[#5a7375] mb-6">
                        Book your appointment online in under 2 minutes.
                    </p>
                    <Link href="/appointments" className="btn-primary px-8 py-4 text-base">
                        Book an Appointment
                    </Link>
                </AnimatedSection>
            </section>
        </div>
    );
}
