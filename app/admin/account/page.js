"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function AdminAccount() {
    const { user } = useAuth();
    const [step, setStep] = useState(1); // 1 = request OTP, 2 = enter OTP + new password
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleRequestOTP = async () => {
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const data = await apiFetch("/auth/request-otp", { method: "POST" });
            setMessage({ type: "success", text: data.message });
            setStep(2);
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const data = await apiFetch("/auth/change-password", {
                method: "POST",
                body: JSON.stringify({ otp, newPassword }),
            });
            setMessage({ type: "success", text: data.message });
            setStep(1);
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg space-y-6">
            <div className="pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-serif font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your admin account settings.</p>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account Info</h2>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl uppercase">
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <span className="text-xs font-medium px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full capitalize">{user?.role}</span>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Change Password</h2>

                {message.text && (
                    <div className={`text-sm p-3 rounded-lg border ${message.type === "success"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                        {message.text}
                    </div>
                )}

                {step === 1 ? (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                            A 4-digit verification code will be sent to <b>{user?.email}</b>
                        </p>
                        <button
                            onClick={handleRequestOTP}
                            disabled={loading}
                            className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending code..." : "📧 Send Verification Code"}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <p className="text-sm text-green-600">✅ Code sent! Check your email and enter it below.</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                            <input
                                type="text"
                                required
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                placeholder="_ _ _ _"
                                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-center text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => { setStep(1); setMessage({ type: "", text: "" }); }}
                                className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading || otp.length < 4}
                                className="flex-1 bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Changing..." : "Change Password"}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleRequestOTP}
                            disabled={loading}
                            className="w-full text-sm text-teal-600 hover:underline text-center mt-1"
                        >
                            Resend code
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
