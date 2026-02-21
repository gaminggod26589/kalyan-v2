"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
    const { isOwner, user: currentUser } = useAuth();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // New user form state
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "admin" });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        // Extra safety: redirect if somehow accessed without owner role
        if (isOwner === false) {
            router.push("/admin/dashboard");
            return;
        }

        if (isOwner) {
            fetchUsers();
        }
    }, [isOwner, router]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await apiFetch("/admin/users");
            if (data.success) {
                setUsers(data.data);
            }
        } catch (err) {
            setError(err.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError("");

        try {
            const data = await apiFetch("/admin/users", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            if (data.success) {
                setUsers([data.data, ...users]);
                setShowForm(false);
                setFormData({ name: "", email: "", password: "", role: "admin" });
            }
        } catch (err) {
            setFormError(err.message || "Failed to create user");
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (id === currentUser?.id) {
            alert("You cannot delete your own account.");
            return;
        }

        if (confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
            try {
                const data = await apiFetch(`/admin/users/${id}`, { method: "DELETE" });
                if (data.success) {
                    setUsers(users.filter(u => u._id !== id));
                }
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (!isOwner) return null; // Prevent flash before redirect

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Staff Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage admin access to the dashboard.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
                >
                    {showForm ? "Cancel" : "+ Add New User"}
                </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {/* New User Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Staff Account</h2>
                    {formError && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">{formError}</div>}

                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text" required
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email" required
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                            <input
                                type="text" required
                                value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2 border"
                            >
                                <option value="admin">Admin (Appointments & Messages only)</option>
                                <option value="owner">Owner (Full Access)</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 mt-2">
                            <button
                                type="submit" disabled={formLoading}
                                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {formLoading ? "Creating..." : "Create Account"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Users List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8 text-gray-500">Loading staff accounts...</div>
                ) : (
                    users.map((u) => (
                        <div key={u._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${u.role === 'owner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {u.role}
                                </div>
                                {u._id === currentUser?.id && (
                                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">You</span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 truncate">{u.name}</h3>
                            <p className="text-sm text-gray-500 mb-6 truncate">{u.email}</p>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => handleDelete(u._id, u.name)}
                                    disabled={u._id === currentUser?.id}
                                    className="text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
