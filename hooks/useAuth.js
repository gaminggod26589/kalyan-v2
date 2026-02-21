"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage on mount
        const storedToken = localStorage.getItem("adminToken");
        const storedUser = localStorage.getItem("adminUser");

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                setUser(null);
                setToken(null);
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
            }
        }
        setLoading(false);
    }, []);

    const login = (tokenData, userData) => {
        localStorage.setItem("adminToken", tokenData);
        localStorage.setItem("adminUser", JSON.stringify(userData));
        setToken(tokenData);
        setUser(userData);
        router.push("/admin/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setToken(null);
        setUser(null);
        router.push("/admin/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isOwner: user?.role === 'owner' }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
