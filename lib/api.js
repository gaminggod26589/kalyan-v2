"use client";

// Simple wrapper around fetch to automatically include the JWT token
export async function apiFetch(endpoint, options = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        // Optional: handle 401 globally (e.g., auto-logout)
        if (response.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
                if (!window.location.pathname.includes("/admin/login")) {
                    window.location.href = "/admin/login";
                }
            }
        }
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}
