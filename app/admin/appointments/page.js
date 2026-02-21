"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await apiFetch(`/admin/appointments?status=${filter}`);
            if (data.success) {
                setAppointments(data.data);
            }
        } catch (err) {
            setError(err.message || "Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const data = await apiFetch(`/admin/appointments/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
            });

            if (data.success) {
                // Optimistically update UI
                setAppointments(appointments.map(app =>
                    app._id === id ? { ...app, status: newStatus } : app
                ));
            }
        } catch (err) {
            alert(`Error updating status: ${err.message}`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-serif font-bold text-gray-900">Appointments</h1>

                {/* Filters */}
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                    {["all", "pending", "confirmed", "cancelled"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${filter === f
                                    ? "bg-teal-50 text-teal-700 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Loading appointments...
                                    </td>
                                </tr>
                            ) : appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No appointments found matching "{filter}".
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((apt) => (
                                    <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{apt.name}</div>
                                            <div className="text-sm text-gray-500 mt-1">{apt.phone}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{apt.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {apt.service}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{apt.date}</div>
                                            <div className="text-sm text-gray-500 mt-1">{apt.time}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            {apt.message || <span className="text-gray-300 italic">None</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={apt.status}
                                                onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                                                className={`text-sm font-medium rounded-full px-3 py-1.5 border-0 shadow-sm ring-1 ring-inset ${apt.status === "pending" ? "bg-orange-50 text-orange-700 ring-orange-200 focus:ring-orange-500" :
                                                        apt.status === "confirmed" ? "bg-green-50 text-green-700 ring-green-200 focus:ring-green-500" :
                                                            "bg-red-50 text-red-700 ring-red-200 focus:ring-red-500"
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
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
