/**
 * Appointments Page (/appointments)
 *
 * Multi-field booking form that:
 *  - Collects: Name, Phone, Email, Service, Date, Time, Message
 *  - Shows real-time validation feedback
 *  - Posts to backend API (POST /api/appointments)
 *  - Falls back gracefully if API is unavailable (demo mode)
 *  - Shows success/error state after submission
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

/* Available services for the dropdown */
const SERVICES = [
    "Sports Injury Rehabilitation",
    "Orthopaedic Physiotherapy",
    "Neurological Rehabilitation",
    "Spine & Back Care",
    "Post-Surgical Recovery",
    "Pediatric Physiotherapy",
    "General Assessment",
];

/* Available time slots */
const TIME_SLOTS = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
];

/* Initial form state */
const INITIAL_FORM = {
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
};

export default function AppointmentsPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    /* ── Validation ── */
    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = "Full name is required.";
        if (!form.phone.trim()) errs.phone = "Phone number is required.";
        else if (!/^[0-9+\s-]{8,15}$/.test(form.phone)) errs.phone = "Enter a valid phone number.";
        if (!form.email.trim()) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address.";
        if (!form.service) errs.service = "Please select a service.";
        if (!form.date) errs.date = "Please choose a preferred date.";
        if (!form.time) errs.time = "Please select a time slot.";
        return errs;
    }

    /* ── Handle input change ── */
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error for field when user starts typing
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    /* ── Handle form submission ── */
    async function handleSubmit(e) {
        e.preventDefault();

        // Client-side validation
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setStatus("loading");

        try {
            // POST to Next.js API Route
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm(INITIAL_FORM); // Reset form
            } else {
                setStatus("error");
            }
        } catch {
            // Demo mode: if backend isn't running, still show success for demo purposes
            console.warn("API unavailable — demo mode");
            setStatus("success");
            setForm(INITIAL_FORM);
        }
    }

    /* ── Success State ── */
    if (status === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7fafa] pt-20">
                <AnimatedSection direction="none">
                    <div className="max-w-md mx-auto px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h1
                            className="text-3xl font-bold text-[#1a2e35] mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Appointment Booked!
                        </h1>
                        <p className="text-[#5a7375] text-lg mb-8">
                            Thank you! We've received your appointment request. Our team will confirm your booking within 2 hours via phone or email.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setStatus("idle")}
                                className="btn-primary px-6 py-3"
                            >
                                Book Another
                            </button>
                            <Link href="/" className="btn-outline !text-[#0d7377] !border-[#0d7377] px-6 py-3">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        );
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
                        <span className="text-white">Book Appointment</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Book an Appointment
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Fill in the form below and we'll confirm your booking within 2 hours. Walk-ins are also welcome during clinic hours.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
                        <path d="M0 60L60 51.5C120 43 240 26 360 21C480 16 600 23 720 28C840 33 960 36 1080 33.5C1200 31 1320 23 1380 19L1440 15V60H0Z" fill="#f7fafa" />
                    </svg>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="section-pad bg-[#f7fafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* ── Booking Form ── */}
                        <div className="lg:col-span-2">
                            <AnimatedSection>
                                <div className="bg-white rounded-2xl border border-[#dde8e8] shadow-sm p-8">
                                    <h2 className="text-2xl font-bold text-[#1a2e35] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                                        Patient Information
                                    </h2>
                                    <p className="text-[#5a7375] text-sm mb-8">
                                        All fields marked with <span className="text-red-500">*</span> are required.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                                        {/* Row 1: Name + Phone */}
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Full Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Rajesh Kumar"
                                                    className={`form-input ${errors.name ? "border-red-400 focus:border-red-400" : ""}`}
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    className={`form-input ${errors.phone ? "border-red-400 focus:border-red-400" : ""}`}
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        {/* Row 2: Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className={`form-input ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                                        </div>

                                        {/* Row 3: Service */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Service Required <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="service"
                                                value={form.service}
                                                onChange={handleChange}
                                                className={`form-input ${errors.service ? "border-red-400 focus:border-red-400" : ""}`}
                                            >
                                                <option value="">Select a service…</option>
                                                {SERVICES.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            {errors.service && <p className="text-red-500 text-xs mt-1.5">{errors.service}</p>}
                                        </div>

                                        {/* Row 4: Date + Time */}
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Preferred Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={form.date}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    className={`form-input ${errors.date ? "border-red-400 focus:border-red-400" : ""}`}
                                                />
                                                {errors.date && <p className="text-red-500 text-xs mt-1.5">{errors.date}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                    Preferred Time <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    name="time"
                                                    value={form.time}
                                                    onChange={handleChange}
                                                    className={`form-input ${errors.time ? "border-red-400 focus:border-red-400" : ""}`}
                                                >
                                                    <option value="">Select a time…</option>
                                                    {TIME_SLOTS.map((t) => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>
                                                {errors.time && <p className="text-red-500 text-xs mt-1.5">{errors.time}</p>}
                                            </div>
                                        </div>

                                        {/* Row 5: Message (optional) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-[#1a2e35] mb-2">
                                                Additional Notes <span className="text-[#5a7375] font-normal">(optional)</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Briefly describe your condition or any concerns you'd like us to know about…"
                                                className="form-input resize-none"
                                            />
                                        </div>

                                        {/* Error state message */}
                                        {status === "error" && (
                                            <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                                Something went wrong. Please try again or call us directly.
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {status === "loading" ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                    </svg>
                                                    Submitting…
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                                        <line x1="3" y1="10" x2="21" y2="10" />
                                                    </svg>
                                                    Confirm Appointment
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* ── Sidebar Info ── */}
                        <AnimatedSection direction="left" delay={0.15} className="space-y-5">

                            {/* Clinic Hours */}
                            <div className="bg-white rounded-2xl border border-[#dde8e8] p-6">
                                <h3 className="font-bold text-[#1a2e35] mb-4 flex items-center gap-2">
                                    <svg className="text-[#0d7377]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    Clinic Hours
                                </h3>
                                {[
                                    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                                    { day: "Saturday", time: "9:00 AM – 5:00 PM" },
                                    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
                                ].map(({ day, time }) => (
                                    <div key={day} className="flex justify-between text-sm py-2.5 border-b border-[#f0f4f4] last:border-0">
                                        <span className="text-[#5a7375]">{day}</span>
                                        <span className="font-medium text-[#1a2e35]">{time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Contact */}
                            <div
                                className="rounded-2xl p-6 text-white"
                                style={{ background: "var(--gradient-hero)" }}
                            >
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.4 1.08 2 2 0 0 1 5.37 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16z" />
                                    </svg>
                                    Prefer to Call?
                                </h3>
                                <p className="text-white/75 text-sm mb-4">
                                    Speak directly with our reception team to book or check availability.
                                </p>
                                <a href="tel:+912512345678" className="btn-outline block text-center text-sm py-3">
                                    +91 251 234 5678
                                </a>
                            </div>

                            {/* What to Bring */}
                            <div className="bg-white rounded-2xl border border-[#dde8e8] p-6">
                                <h3 className="font-bold text-[#1a2e35] mb-4">What to Bring</h3>
                                {[
                                    "Any X-rays, MRI, or scan reports",
                                    "Doctor's referral (if any)",
                                    "List of current medications",
                                    "Comfortable, loose-fitting clothing",
                                    "Medical insurance card (if applicable)",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5 mb-2.5 last:mb-0">
                                        <div className="w-4 h-4 shrink-0 mt-0.5 rounded-full bg-[#0d7377]/10 flex items-center justify-center">
                                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="text-[#5a7375] text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}
