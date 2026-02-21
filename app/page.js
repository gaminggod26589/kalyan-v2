/**
 * Home Page (/) — Landing page for Kalyan Physiotherapy
 *
 * Sections:
 *  1. Hero — Full-viewport with animated headline & CTAs
 *  2. Stats — Key clinic metrics (animated counters)
 *  3. Services — 6 service cards overview
 *  4. Why Choose Us — 4 reason cards
 *  5. Testimonials — Patient reviews carousel
 *  6. CTA Banner — Call-to-action to book appointment
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

/* ─── Service data ─── */
const SERVICES = [
  {
    icon: "🏃",
    title: "Sports Injury Rehab",
    desc: "Targeted treatment for athletes — ligament tears, muscle strains, joint injuries, and return-to-sport programs.",
    color: "#0d7377",
  },
  {
    icon: "🦴",
    title: "Orthopaedic Physio",
    desc: "Comprehensive care for bone, joint, and muscle conditions including arthritis, fractures, and post-surgery recovery.",
    color: "#085f63",
  },
  {
    icon: "🧠",
    title: "Neurological Rehab",
    desc: "Specialised programs for stroke, Parkinson's, MS, and other neurological conditions to restore movement and function.",
    color: "#0d7377",
  },
  {
    icon: "🔙",
    title: "Spine & Back Care",
    desc: "Evidence-based treatment for chronic back pain, sciatica, disc herniation, cervical spondylosis, and posture correction.",
    color: "#085f63",
  },
  {
    icon: "💊",
    title: "Post-Surgical Recovery",
    desc: "Structured rehabilitation after surgeries like ACL repair, hip/knee replacement, and rotator cuff procedures.",
    color: "#0d7377",
  },
  {
    icon: "👶",
    title: "Pediatric Physiotherapy",
    desc: "Gentle, play-based therapy for children with developmental delays, cerebral palsy, and musculoskeletal conditions.",
    color: "#085f63",
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "5K+", label: "Patients Treated" },
  { value: "98%", label: "Recovery Rate" },
  { value: "15+", label: "Specialisations" },
];

/* ─── Why Choose Us ─── */
const REASONS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Expert Physiotherapists",
    desc: "Our team of BPT & MPT qualified therapists bring years of clinical experience and continuous training.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Modern Equipment",
    desc: "We use the latest therapeutic technology — electrotherapy, ultrasound, laser, and hydrotherapy equipment.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Personalised Care",
    desc: "Every treatment plan is tailored to the individual patient's needs, goals, and lifestyle.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Flexible Timings",
    desc: "Open 6 days a week with evening slots available, making quality care accessible around your schedule.",
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Marathon Runner",
    rating: 5,
    text: "After my knee surgery, I thought I'd never run again. The team at Kalyan Physio had me back on the track in 4 months. Absolutely incredible care!",
    avatar: "PM",
    color: "#0d7377",
  },
  {
    name: "Rajesh Sharma",
    role: "Office Professional",
    rating: 5,
    text: "Chronic back pain had been ruining my life for 2 years. After just 8 sessions of treatment and guided exercises, I'm pain-free. Life-changing!",
    avatar: "RS",
    color: "#085f63",
  },
  {
    name: "Sunita Patil",
    role: "Homemaker",
    rating: 5,
    text: "The physiotherapists are so kind and patient. My mother had a stroke and their neuro rehab program helped her regain movement in her arm. Thank you!",
    avatar: "SP",
    color: "#0d7377",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center" style={{ background: "var(--gradient-hero)" }}>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#e3a832]/10 translate-y-1/2 -translate-x-1/3" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#e3a832] animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Expert Physiotherapy in Kalyan
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Restore Your
              <br />
              <span className="text-[#e3a832]">Movement,</span>
              <br />
              Reclaim Your Life
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Kalyan Physiotherapy provides evidence-based rehabilitation and pain
              management services that help you recover faster, move better, and
              return to doing what you love.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/appointments" className="btn-primary text-base px-7 py-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </Link>
              <Link href="/services" className="btn-outline text-base px-7 py-3.5">
                Explore Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 mt-10"
            >
              <div className="flex -space-x-2">
                {["#0d7377", "#085f63", "#14a8ae", "#0d5c60"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: c }}
                  >
                    {["R", "S", "P", "A"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#e3a832">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-xs mt-0.5">5,000+ satisfied patients</p>
              </div>
            </motion.div>
          </div>

          {/* Right — Floating info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Main feature card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0d7377] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a2e35] text-sm">Holistic Approach</p>
                  <p className="text-[#5a7375] text-xs">Mind & Body Recovery</p>
                </div>
              </div>
              <p className="text-[#5a7375] text-sm leading-relaxed">
                We treat the whole person, not just the injury. Our team combines manual therapy, exercise rehabilitation, and patient education.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Available Now */}
              <div className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-green-200" />
                </div>
                <p className="font-semibold text-[#1a2e35] text-sm">Available Today</p>
                <p className="text-[#5a7375] text-xs">Walk-in & bookings welcome</p>
              </div>

              {/* Quick appointment */}
              <div className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#0d7377]/10 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="font-semibold text-[#1a2e35] text-sm">Quick Booking</p>
                <p className="text-[#5a7375] text-xs">Confirm in under 2 minutes</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 80L60 68.7C120 57.3 240 34.7 360 28C480 21.3 600 30.7 720 37.3C840 44 960 48 1080 44.7C1200 41.3 1320 30.7 1380 25.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f7fafa" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — STATS
      ══════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                <p
                  className="text-4xl md:text-5xl font-bold text-[#0d7377] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#5a7375] text-sm font-medium">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — SERVICES
      ══════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--gradient-soft)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="section-label">What We Treat</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1a2e35]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Specialised Services
            </h2>
            <p className="mt-4 text-[#5a7375] text-lg max-w-2xl mx-auto">
              Comprehensive physiotherapy solutions for every stage of your recovery journey.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#dde8e8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0d7377]/08 flex items-center justify-center mb-5 text-3xl group-hover:bg-[#0d7377]/12 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-[#1a2e35] text-lg mb-3">{service.title}</h3>
                  <p className="text-[#5a7375] text-sm leading-relaxed flex-1">{service.desc}</p>
                  <Link
                    href="/services"
                    className="mt-5 text-[#0d7377] text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all"
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Link href="/services" className="btn-primary inline-flex">
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <AnimatedSection direction="right">
              <span className="section-label">Why Choose Us</span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1a2e35] mt-2 mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Care You Can
                <span className="text-[#0d7377]"> Trust</span>
              </h2>
              <p className="text-[#5a7375] text-lg leading-relaxed mb-10">
                At Kalyan Physiotherapy, every decision we make is centred around your
                recovery and wellbeing. We combine clinical expertise with genuine compassion.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {REASONS.map((r, i) => (
                  <AnimatedSection key={r.title} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-[#0d7377]/10 flex items-center justify-center text-[#0d7377]">
                        {r.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a2e35] mb-1.5">{r.title}</h4>
                        <p className="text-[#5a7375] text-sm leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Right — Visual card */}
            <AnimatedSection direction="left" delay={0.15}>
              <div
                className="relative rounded-3xl p-8 md:p-12 text-white overflow-hidden"
                style={{ background: "var(--gradient-hero)" }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#e3a832]/15 translate-y-1/3 -translate-x-1/3" />

                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <h3
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Your Recovery Is Our Priority
                  </h3>
                  <p className="text-white/75 leading-relaxed mb-8">
                    We don't just treat symptoms — we empower you with the knowledge
                    and tools to maintain your health for the long term.
                  </p>
                  {/* Checklist */}
                  {[
                    "Detailed initial assessment",
                    "Evidence-based treatment protocols",
                    "Home exercise programs",
                    "Progress tracking & follow-ups",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3">
                      <div className="w-5 h-5 rounded-full bg-[#e3a832] flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--gradient-soft)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="section-label">Patient Stories</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1a2e35]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Our Patients Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#dde8e8] hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#e3a832">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-[#5a7375] text-sm leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a2e35] text-sm">{t.name}</p>
                      <p className="text-[#5a7375] text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — CTA BANNER
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <AnimatedSection className="max-w-4xl mx-auto px-6">
          <div
            className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
            style={{ background: "var(--gradient-hero)" }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#e3a832]/10" />

            <div className="relative">
              <span className="section-label" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                Start Today
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to Feel Better?
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                Take the first step toward pain-free living. Book your initial assessment today
                and let our expert team create a personalised recovery plan for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/appointments" className="btn-primary bg-[#e3a832] hover:bg-[#c08a1e] text-base px-8 py-4">
                  Book Free Assessment
                </Link>
                <Link href="/contact" className="btn-outline text-base px-8 py-4">
                  Call Us: +91 251 234 5678
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}