"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

// ─── Modes ───────────────────────────────────────────
// "login"  → normal sign in
// "forgot-1" → enter email to get OTP
// "forgot-2" → enter OTP + new password

export default function AdminLogin() {
    const { login } = useAuth();
    const [mode, setMode] = useState("login");

    // Login state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Forgot password state
    const [fpEmail, setFpEmail] = useState("");
    const [fpOtp, setFpOtp] = useState("");
    const [fpNewPassword, setFpNewPassword] = useState("");
    const [fpConfirmPassword, setFpConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetState = () => {
        setError(""); setSuccess(""); setLoading(false);
    };

    const switchTo = (newMode) => {
        resetState();
        setMode(newMode);
    };

    // ── Login ──────────────────────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); setError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                login(data.token, data.user);
            } else {
                setError(data.message || "Login failed");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 1: Send OTP to email ──────────────────────
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true); setError(""); setSuccess("");
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fpEmail }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(data.message);
                setMode("forgot-2");
            } else {
                setError(data.message);
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Reset password ─────────────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (fpNewPassword !== fpConfirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true); setError("");
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: fpEmail, otp: fpOtp, newPassword: fpNewPassword }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(data.message);
                setTimeout(() => switchTo("login"), 2000);
            } else {
                setError(data.message);
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            >
                {/* Header */}
                <div>
                    <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-gray-900">
                        Kalyan Physiotherapy
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {mode === "login" && "Sign in to the Admin Dashboard"}
                        {mode === "forgot-1" && "Reset your password"}
                        {mode === "forgot-2" && "Enter the code we sent you"}
                    </p>
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 text-center">
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── FORM: Login ── */}
                {mode === "login" && (
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <input
                                type="email" required
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm"
                                placeholder="admin@kalyanphysio.in"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password" required
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm"
                                placeholder="••••••••"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Forgot Password link */}
                        <div className="text-right">
                            <button type="button" onClick={() => switchTo("forgot-1")}
                                className="text-sm text-teal-600 hover:text-teal-800 hover:underline font-medium">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full flex justify-center rounded-lg bg-teal-600 py-3 px-3 text-sm font-semibold text-white hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-teal-600 transition-all disabled:opacity-70"
                        >
                            {loading ? "Signing in..." : "Sign in to Dashboard"}
                        </button>
                    </form>
                )}

                {/* ── FORM: Forgot Step 1 — Enter email ── */}
                {mode === "forgot-1" && (
                    <form className="space-y-5" onSubmit={handleSendOTP}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your registered email</label>
                            <input
                                type="email" required
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm"
                                placeholder="admin@kalyanphysio.in"
                                value={fpEmail} onChange={(e) => setFpEmail(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1.5">We'll send a 4-digit code to this email.</p>
                        </div>
                        <button
                            type="submit" disabled={loading}
                            className="w-full flex justify-center rounded-lg bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-500 transition-all disabled:opacity-70"
                        >
                            {loading ? "Sending..." : "📧 Send Verification Code"}
                        </button>
                        <div className="text-center">
                            <button type="button" onClick={() => switchTo("login")}
                                className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                                ← Back to Sign In
                            </button>
                        </div>
                    </form>
                )}

                {/* ── FORM: Forgot Step 2 — OTP + new password ── */}
                {mode === "forgot-2" && (
                    <form className="space-y-5" onSubmit={handleResetPassword}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                            <input
                                type="text" required maxLength={4}
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-center text-2xl font-bold tracking-widest text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600"
                                placeholder="_ _ _ _"
                                value={fpOtp}
                                onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password" required minLength={6}
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm"
                                placeholder="At least 6 characters"
                                value={fpNewPassword} onChange={(e) => setFpNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password" required
                                className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm"
                                placeholder="Re-enter new password"
                                value={fpConfirmPassword} onChange={(e) => setFpConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit" disabled={loading || fpOtp.length < 4}
                            className="w-full flex justify-center rounded-lg bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-500 transition-all disabled:opacity-70"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        <div className="flex justify-between text-sm">
                            <button type="button" onClick={() => switchTo("forgot-1")}
                                className="text-gray-500 hover:text-gray-700 hover:underline">
                                ← Change email
                            </button>
                            <button type="button" onClick={handleSendOTP} disabled={loading}
                                className="text-teal-600 hover:underline font-medium disabled:opacity-50">
                                Resend code
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
