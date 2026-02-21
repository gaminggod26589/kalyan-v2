/**
 * Services Page (/services)
 *
 * Full-detail view of all 6 physiotherapy services with:
 *  - Icon, title, description, what we treat list
 *  - Process / what to expect section
 *  - FAQ accordion
 *  - CTA
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

/* ─── Full service detail data ─── */
const SERVICES = [
    {
        id: "sports",
        icon: "🏃",
        title: "Sports Injury Rehabilitation",
        shortDesc: "Get back to peak performance with specialised sports physiotherapy.",
        fullDesc:
            "Whether you're a weekend warrior or competitive athlete, sports injuries can sideline you. Our sports rehab program uses advanced techniques to accelerate healing, restore strength, and prevent re-injury.",
        treats: [
            "ACL / PCL tears & knee injuries",
            "Rotator cuff & shoulder injuries",
            "Ankle sprains & fractures",
            "Hamstring & groin strains",
            "Tennis / Golfer's elbow",
            "Stress fractures & shin splints",
        ],
        color: "#0d7377",
        gradient: "from-[#0d7377] to-[#085f63]",
    },
    {
        id: "ortho",
        icon: "🦴",
        title: "Orthopaedic Physiotherapy",
        shortDesc: "Expert care for bone, joint, and musculoskeletal conditions.",
        fullDesc:
            "Our orthopaedic physiotherapy addresses a wide range of bone and joint problems. We combine manual therapy, therapeutic exercise, and education to reduce pain and restore function.",
        treats: [
            "Knee & hip osteoarthritis",
            "Post-fracture rehabilitation",
            "Joint replacement recovery",
            "Tendinopathy & bursitis",
            "Frozen shoulder (adhesive capsulitis)",
            "Plantar fasciitis & foot pain",
        ],
        color: "#085f63",
        gradient: "from-[#085f63] to-[#043f42]",
    },
    {
        id: "neuro",
        icon: "🧠",
        title: "Neurological Rehabilitation",
        shortDesc: "Restoring movement and independence after neurological conditions.",
        fullDesc:
            "Neurological conditions require specialised expertise and compassion. Our neuro rehab team uses evidence-based techniques to help patients regain movement, balance, and quality of life.",
        treats: [
            "Stroke recovery & paralysis",
            "Parkinson's disease management",
            "Multiple sclerosis (MS)",
            "Traumatic brain injury",
            "Guillain-Barré syndrome",
            "Balance & vestibular disorders",
        ],
        color: "#0d7377",
        gradient: "from-[#0d7377] to-[#085f63]",
    },
    {
        id: "spine",
        icon: "🔙",
        title: "Spine & Back Care",
        shortDesc: "Effective treatment for chronic back and neck pain.",
        fullDesc:
            "Spine conditions are among the most common reasons people seek physiotherapy. Our spine specialists provide targeted, non-surgical solutions to tackle the root cause of your pain.",
        treats: [
            "Chronic lower back pain",
            "Sciatica & nerve pain",
            "Disc herniation & bulge",
            "Cervical spondylosis",
            "Posture correction",
            "Spinal stenosis management",
        ],
        color: "#085f63",
        gradient: "from-[#085f63] to-[#043f42]",
    },
    {
        id: "surgical",
        icon: "💊",
        title: "Post-Surgical Recovery",
        shortDesc: "Structured rehabilitation to ensure optimal surgical outcomes.",
        fullDesc:
            "Surgery is often only the first step. Proper post-operative physiotherapy is critical to ensure full recovery, prevent complications, and help you regain strength and confidence.",
        treats: [
            "ACL / ligament reconstruction",
            "Hip & knee replacement rehab",
            "Spine surgery rehabilitation",
            "Rotator cuff repair recovery",
            "Cardiac / thoracic surgery",
            "Abdominal surgery rehab",
        ],
        color: "#0d7377",
        gradient: "from-[#0d7377] to-[#085f63]",
    },
    {
        id: "paeds",
        icon: "👶",
        title: "Pediatric Physiotherapy",
        shortDesc: "Gentle, fun, and effective therapy for children.",
        fullDesc:
            "Children have unique physiological needs. Our paediatric physiotherapists create nurturing, play-based environments where children feel comfortable while receiving targeted treatment.",
        treats: [
            "Cerebral palsy management",
            "Developmental delay",
            "Torticollis & plagiocephaly",
            "Scoliosis in children",
            "Growing pains & Osgood-Schlatter",
            "Juvenile arthritis",
        ],
        color: "#085f63",
        gradient: "from-[#085f63] to-[#043f42]",
    },
];

/* ─── FAQ data ─── */
const FAQS = [
    {
        q: "How many sessions will I need?",
        a: "The number of sessions depends on your specific condition and goals. After your initial assessment, your physiotherapist will provide a recommended treatment plan. Most acute injuries resolve in 6–12 sessions, while chronic conditions may require longer programs.",
    },
    {
        q: "Do I need a doctor's referral?",
        a: "No referral is required at Kalyan Physiotherapy. You can book an appointment directly with us. However, if you have recent imaging reports or a referral letter, please bring it along — it helps us provide better care.",
    },
    {
        q: "What should I wear to my appointment?",
        a: "Wear comfortable, loose-fitting clothing that allows access to the area being treated. For lower limb injuries, shorts are ideal. For upper limb or shoulder issues, a short-sleeved or sleeveless top works best.",
    },
    {
        q: "Is physiotherapy covered by health insurance?",
        a: "Many health insurance plans cover physiotherapy. We recommend checking with your insurance provider. We can provide receipts and documentation to support your claim.",
    },
    {
        q: "Can I walk in without an appointment?",
        a: "Walk-ins are welcome, but booking an appointment ensures you get a dedicated time slot with your preferred therapist and minimises waiting time.",
    },
];

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a, isOpen, onToggle }) {
    return (
        <div className="border border-[#dde8e8] rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-[#f7fafa] transition-colors"
            >
                <span className="font-semibold text-[#1a2e35] pr-4">{q}</span>
                <span
                    className={`shrink-0 w-7 h-7 rounded-full border border-[#0d7377] flex items-center justify-center text-[#0d7377] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="px-6 pb-5 bg-white">
                    <p className="text-[#5a7375] text-sm leading-relaxed border-t border-[#f0f4f4] pt-4">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState(null);

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
                        <span className="text-white">Services</span>
                    </div>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Our Services
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl">
                        Comprehensive physiotherapy and rehabilitation services, personalised for your unique recovery journey.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
                        <path d="M0 60L60 51.5C120 43 240 26 360 21C480 16 600 23 720 28C840 33 960 36 1080 33.5C1200 31 1320 23 1380 19L1440 15V60H0Z" fill="#f7fafa" />
                    </svg>
                </div>
            </section>

            {/* ── Services Grid ── */}
            <section className="section-pad bg-[#f7fafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {SERVICES.map((service, i) => (
                            <AnimatedSection key={service.id} delay={i * 0.08}>
                                <div className="bg-white rounded-2xl border border-[#dde8e8] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    {/* Header */}
                                    <div className={`bg-gradient-to-br ${service.gradient} p-7 flex items-start gap-4`}>
                                        <span className="text-5xl">{service.icon}</span>
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                                                {service.title}
                                            </h2>
                                            <p className="text-white/75 text-sm">{service.shortDesc}</p>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-7 flex flex-col flex-1">
                                        <p className="text-[#5a7375] text-sm leading-relaxed mb-6">{service.fullDesc}</p>

                                        <h4 className="font-semibold text-[#1a2e35] text-sm mb-3 uppercase tracking-wide">
                                            Conditions We Treat
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                                            {service.treats.map((t) => (
                                                <li key={t} className="flex items-start gap-2 text-sm text-[#5a7375]">
                                                    <div className="w-4 h-4 shrink-0 mt-0.5 rounded-full bg-[#0d7377]/10 flex items-center justify-center">
                                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="3">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/appointments"
                                            className="mt-6 inline-flex items-center gap-2 text-[#0d7377] text-sm font-semibold hover:gap-3 transition-all"
                                        >
                                            Book for this service
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What to Expect ── */}
            <section className="section-pad bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-14">
                        <span className="section-label">Your First Visit</span>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[#1a2e35]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            What to Expect
                        </h2>
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Initial Assessment", desc: "A thorough evaluation of your condition, medical history, and functional limitations — typically 45–60 minutes." },
                            { step: "02", title: "Treatment Plan", desc: "Based on your assessment, we create a personalised treatment plan with clear goals, timelines, and expected outcomes." },
                            { step: "03", title: "Active Treatment", desc: "Hands-on therapy sessions combining manual techniques, targeted exercises, and therapeutic modalities." },
                            { step: "04", title: "Progress Review", desc: "Regular reassessments to track your progress, adjust the treatment plan, and guide you toward full independence." },
                        ].map((s, i) => (
                            <AnimatedSection key={s.step} delay={i * 0.1}>
                                <div className="text-center p-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0d7377]/10 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-[#0d7377] text-lg font-bold">{s.step}</span>
                                    </div>
                                    <h3 className="font-bold text-[#1a2e35] mb-2">{s.title}</h3>
                                    <p className="text-[#5a7375] text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ Section ── */}
            <section className="section-pad" style={{ background: "var(--gradient-soft)" }}>
                <div className="max-w-3xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-10">
                        <span className="section-label">FAQ</span>
                        <h2
                            className="text-4xl font-bold text-[#1a2e35]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Common Questions
                        </h2>
                    </AnimatedSection>
                    <div className="space-y-3">
                        {FAQS.map((faq, i) => (
                            <AnimatedSection key={i} delay={i * 0.05}>
                                <FaqItem
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openFaq === i}
                                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                                />
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
                        Not Sure Which Service You Need?
                    </h2>
                    <p className="text-[#5a7375] text-lg mb-8">
                        Book a free 15-minute phone consultation and our team will guide you to the right treatment.
                    </p>
                    <Link href="/appointments" className="btn-primary text-base px-8 py-4">
                        Book Free Consultation
                    </Link>
                </AnimatedSection>
            </section>
        </div>
    );
}
