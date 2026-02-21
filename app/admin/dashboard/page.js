"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        appointments: 0,
        pending: 0,
        messages: 0,
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                // Fetch appointments
                const apptData = await apiFetch("/admin/appointments?limit=5");

                // Fetch messages to get unread count
                const msgData = await apiFetch("/admin/messages");

                if (apptData.success && msgData.success) {
                    const allApps = apptData.data;
                    const pendApps = allApps.filter(a => a.status === "pending").length;
                    const unreadMsgs = msgData.data.filter(m => !m.isRead).length;

                    setStats({
                        appointments: allApps.length, // total in db (this limit 5 is a bit of a hack for the demo, ideally a separate /admin/stats endpoint)
                        pending: pendApps,
                        messages: unreadMsgs
                    });

                    setRecentAppointments(allApps.slice(0, 5));
                }
            } catch (err) {
                setError(err.message || "Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return <div className="text-gray-500">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Appointments"
                    value={stats.appointments}
                    icon="📅"
                    color="bg-blue-50 text-blue-700"
                />
                <StatCard
                    title="Pending Approvals"
                    value={stats.pending}
                    icon="⏳"
                    color="bg-orange-50 text-orange-700"
                />
                <StatCard
                    title="Unread Messages"
                    value={stats.messages}
                    icon="📬"
                    color="bg-teal-50 text-teal-700"
                />
            </div>

            {/* Recent Appointments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Recent Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No recent appointments found.
                                    </td>
                                </tr>
                            ) : (
                                recentAppointments.map((apt) => (
                                    <tr key={apt._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{apt.name}</div>
                                            <div className="text-sm text-gray-500">{apt.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {apt.service}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {apt.date} at {apt.time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={apt.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4"
        >
            <div className={`p-4 rounded-full ${color} text-2xl`}>{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </motion.div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-orange-100 text-orange-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status]}`}>
            {status}
        </span>
    );
}
