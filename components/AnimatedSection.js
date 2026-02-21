/**
 * AnimatedSection.js — Reusable scroll-triggered animation wrapper
 *
 * Wraps any content and plays a fade-up animation when the element
 * enters the viewport. Uses Framer Motion's `whileInView` API.
 *
 * Usage:
 *   <AnimatedSection delay={0.2}>
 *     <YourContent />
 *   </AnimatedSection>
 */

"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({
    children,
    className = "",
    delay = 0,        // Stagger delay in seconds
    direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
    duration = 0.6,
    once = true,      // Only animate once (true) or every time (false)
}) {
    /* Build initial offset based on direction */
    const offsets = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
        none: { y: 0, x: 0 },
    };

    const initial = { opacity: 0, ...offsets[direction] };
    const animate = { opacity: 1, y: 0, x: 0 };

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={animate}
            viewport={{ once, margin: "-60px" }}  // Trigger 60px before element enters
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier
            }}
        >
            {children}
        </motion.div>
    );
}
