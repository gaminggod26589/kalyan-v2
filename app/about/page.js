/**
 * About Page (/about)
 *
 * Sections:
 *  1. Page Hero — with breadcrumb
 *  2. Our Story — clinic history & mission
 *  3. Lead Doctor Profile — Dr. Anita Sharma
 *  4. Team cards
 *  5. Values / Mission
 *  6. Certifications & Affiliations
 */

"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

/* Note: Page metadata is set in root layout.js (title template covers all pages) */

/* ─── Team Members ─── */
const TEAM = [
    {
        name: "Dr. Anita Sharma",
        role: "Lead Physiotherapist & Clinic Director",
        qual: "BPT, MPT (Orthopaedics), MIAP",
        exp: "12 Years Experience",
        initials: "AS",
        color: "#0d7377",
        bio: "Dr. Anita specialises in orthopaedic and sports injury rehabilitation. She completed her MPT from MGM University and has trained at leading hospitals in Mumbai. Her patient-centred approach and dedication to evidence-based practice have helped thousands recover.",
    },
    {
        name: "Dr. Rohit Nair",
        role: "Senior Physiotherapist",
        qual: "BPT, MPT (Neurology)",
        exp: "8 Years Experience",
        initials: "RN",
        color: "#085f63",
        bio: "Dr. Rohit focuses on neurological and paediatric physiotherapy. His gentle, play-based approach with children and innovative techniques for stroke recovery make him a favourite among patients and families.",
    },
    {
        name: "Ms. Priya Kulkarni",
        role: "Sports Rehabilitation Specialist",
        qual: "BPT, CSCS",
        exp: "6 Years Experience",
        initials: "PK",
        color: "#14a8ae",
        bio: "Ms. Priya works primarily with athletes and active individuals. Her expertise in sports-specific training, functional movement assessment, and return-to-sport protocols has helped dozens of local athletes get back to peak performance.",
    },
];

/* ─── Core Values ─── */
const VALUES = [
    {
        icon: "🎯",
        title: "Evidence-Based Practice",
        desc: "Every treatment decision is grounded in the latest clinical research and best practices.",
    },
    {
        icon: "🤝",
        title: "Patient-Centred Care",
        desc: "We listen first. Your goals, lifestyle, and concerns shape every aspect of your treatment plan.",
    },
    {
        icon: "📈",
        title: "Continuous Improvement",
        desc: "Our team regularly attends conferences and workshops to bring you the most current techniques.",
    },
    {
        icon: "🌟",
        title: "Holistic Wellbeing",
        desc: "We address the whole person — physical, mental, and lifestyle factors — for lasting results.",
    },
];

/* ─── Timeline milestones ─── */
const MILESTONES = [
    { year: "2016", event: "Kalyan Physiotherapy founded by Dr. Anita Sharma with a 2-room clinic" },
    { year: "2018", event: "Expanded to full facility with state-of-the-art equipment and 3-member team" },
    { year: "2020", event: "Launched online tele-physiotherapy services during the pandemic" },
    { year: "2022", event: "Reached milestone of 3,000+ patients treated; added sports rehab wing" },
    { year: "2024", event: "Awarded 'Best Physiotherapy Clinic in Kalyan' by District Health Association" },
];

export default function AboutPage() {
    return (
        <div className="overflow-hidden">

            {/* ── Page Hero ── */}
            <section
                className="pt-28 pb-16 relative"
                style={{ background: "var(--gradient-hero)" }}
            >
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                />
                <div className="max-w-7xl mx-auto px-6 relative">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">About Us</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        About Our Clinic
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        A decade of compassionate care, clinical excellence, and thousands of recovery stories — that's who we are.
                    </p>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
                        <path d="M0 60L60 51.5C120 43 240 26 360 21C480 16 600 23 720 28C840 33 960 36 1080 33.5C1200 31 1320 23 1380 19L1440 15V60H0Z" fill="#f7fafa" />
                    </svg>
                </div>
            </section>

            {/* ── Our Story + Timeline ── */}
            <section className="section-pad bg-[#f7fafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* Left — Story */}
                        <AnimatedSection direction="right">
                            <span className="section-label">Our Story</span>
                            <h2
                                className="text-3xl md:text-4xl font-bold text-[#1a2e35] mt-2 mb-6"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                Built on a Passion for Healing
                            </h2>
                            <div className="space-y-4 text-[#5a7375] leading-relaxed">
                                <p>
                                    Kalyan Physiotherapy was born in 2016 from a simple belief: that every person deserves access to high-quality physiotherapy that actually works. Founder Dr. Anita Sharma saw a gap in Kalyan for evidence-based, patient-centred rehabilitation care — and decided to fill it.
                                </p>
                                <p>
                                    What started as a modest two-room clinic has grown into a comprehensive rehabilitation centre, treating over 5,000 patients across all ages and conditions. Our journey has been guided by one unwavering principle: <strong className="text-[#0d7377]">your recovery is our success</strong>.
                                </p>
                                <p>
                                    Today, our multidisciplinary team of physiotherapists brings together expertise in orthopaedics, neurology, sports medicine, and paediatrics — all under one roof in the heart of Kalyan West.
                                </p>
                            </div>
                            <Link href="/appointments" className="btn-primary inline-flex mt-8">
                                Book Your Assessment
                            </Link>
                        </AnimatedSection>

                        {/* Right — Timeline */}
                        <AnimatedSection direction="left" delay={0.15}>
                            <h3 className="font-bold text-[#1a2e35] text-xl mb-8">Our Journey</h3>
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-5 top-0 bottom-0 w-px bg-[#dde8e8]" />

                                {MILESTONES.map((m, i) => (
                                    <div key={m.year} className="flex gap-5 mb-8 last:mb-0">
                                        {/* Dot + Year */}
                                        <div className="relative shrink-0 flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-[#0d7377] border-4 border-[#f7fafa] flex items-center justify-center text-white text-xs font-bold z-10">
                                                {m.year.slice(2)}
                                            </div>
                                        </div>
                                        {/* Content */}
                                        <div className="pt-2 pb-2">
                                            <span className="text-[#0d7377] font-bold text-sm">{m.year}</span>
                                            <p className="text-[#1a2e35] text-sm mt-1 leading-relaxed">{m.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Lead Doctor ── */}
            <section className="section-pad bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-14">
                        <span className="section-label">Meet the Team</span>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#1a2e35]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Expert Physiotherapists
                        </h2>
                        <p className="text-[#5a7375] text-lg mt-4 max-w-2xl mx-auto">
                            Our qualified, experienced team is passionate about helping you achieve your recovery goals.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TEAM.map((member, i) => (
                            <AnimatedSection key={member.name} delay={i * 0.1}>
                                <div className="bg-[#f7fafa] rounded-2xl overflow-hidden border border-[#dde8e8] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    {/* Header */}
                                    <div
                                        className="relative p-8 pb-6 flex flex-col items-center text-center"
                                        style={{ background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}cc 100%)` }}
                                    >
                                        <div
                                            className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
                                            style={{ background: "rgba(255,255,255,0.2)" }}
                                        >
                                            {member.initials}
                                        </div>
                                        <h3 className="text-white font-bold text-xl">{member.name}</h3>
                                        <p className="text-white/75 text-sm mt-1">{member.role}</p>
                                    </div>

                                    {/* Details */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            <span className="px-3 py-1 bg-[#0d7377]/10 text-[#0d7377] rounded-full text-xs font-semibold">
                                                {member.qual}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-[#5a7375] mb-4">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {member.exp}
                                        </span>
                                        <p className="text-[#5a7375] text-sm leading-relaxed flex-1">{member.bio}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="section-pad" style={{ background: "var(--gradient-soft)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-14">
                        <span className="section-label">What Drives Us</span>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#1a2e35]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Our Core Values
                        </h2>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((v, i) => (
                            <AnimatedSection key={v.title} delay={i * 0.1}>
                                <div className="bg-white rounded-2xl p-7 border border-[#dde8e8] text-center hover:shadow-md transition-shadow">
                                    <div className="text-4xl mb-4">{v.icon}</div>
                                    <h3 className="font-bold text-[#1a2e35] mb-3">{v.title}</h3>
                                    <p className="text-[#5a7375] text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 bg-white">
                <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#1a2e35] mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Ready to Start Your Recovery?
                    </h2>
                    <p className="text-[#5a7375] text-lg mb-8">
                        Book a consultation with our team today. We'll assess your condition and build a personalised treatment plan just for you.
                    </p>
                    <Link href="/appointments" className="btn-primary text-base px-8 py-4">
                        Schedule a Consultation
                    </Link>
                </AnimatedSection>
            </section>
        </div>
    );
}
