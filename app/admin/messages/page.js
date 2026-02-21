"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await apiFetch("/admin/messages");
            if (data.success) {
                setMessages(data.data);
            }
        } catch (err) {
            setError(err.message || "Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const toggleReadStatus = async (id, currentStatus) => {
        try {
            const data = await apiFetch(`/admin/messages/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isRead: !currentStatus }),
            });

            if (data.success) {
                setMessages(messages.map(msg =>
                    msg._id === id ? { ...msg, isRead: !currentStatus } : msg
                ));
            }
        } catch (err) {
            alert(`Error updating message: ${err.message}`);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900">Contact Messages</h1>

            {error && <div className="text-red-500">{error}</div>}

            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No messages found.</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {messages.map((msg) => (
                            <li key={msg._id} className={`p-6 transition-colors ${msg.isRead ? 'bg-white' : 'bg-blue-50/50'}`}>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-gray-900 text-lg">{msg.name}</span>
                                            {!msg.isRead && (
                                                <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded-full">NEW</span>
                                            )}
                                            <span className="text-sm text-gray-500 ml-auto whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-teal-700">
                                            <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                                        </div>
                                        <div className="font-medium text-gray-800 mt-3">{msg.subject}</div>
                                        <p className="text-gray-600 mt-1 whitespace-pre-wrap text-sm leading-relaxed border-l-2 border-gray-200 pl-3">
                                            {msg.message}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => toggleReadStatus(msg._id, msg.isRead)}
                                        className={`shrink-0 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${msg.isRead
                                                ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                : "bg-blue-600 border-transparent text-white hover:bg-blue-700 shadow-sm"
                                            }`}
                                    >
                                        {msg.isRead ? "Mark Unread" : "Mark as Read"}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
