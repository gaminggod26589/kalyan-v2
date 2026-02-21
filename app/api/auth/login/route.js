import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required." },
                { status: 400 }
            );
        }

        // 1. Find user by email (ensure lowercased and trimmed)
        const cleanEmail = email.toLowerCase().trim();
        const user = await AdminUser.findOne({ email: cleanEmail });
        if (!user) {
            return NextResponse.json(
                { success: false, message: `Email not found in database: ${cleanEmail}` },
                { status: 401 }
            );
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Incorrect password." },
                { status: 401 }
            );
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: "8h" }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { success: false, message: "An error occurred during login." },
            { status: 500 }
        );
    }
}
