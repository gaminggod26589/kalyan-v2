import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        // Verify JWT
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);

        const { otp, newPassword } = await req.json();
        if (!otp || !newPassword) {
            return NextResponse.json({ success: false, message: "OTP and new password are required." }, { status: 400 });
        }
        if (newPassword.length < 6) {
            return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
        }

        await connectDB();
        const user = await AdminUser.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Validate OTP
        if (!user.otp || user.otp !== otp) {
            return NextResponse.json({ success: false, message: "Invalid verification code." }, { status: 400 });
        }
        if (!user.otpExpiry || user.otpExpiry < new Date()) {
            return NextResponse.json({ success: false, message: "Verification code has expired. Please request a new one." }, { status: 400 });
        }

        // Hash and save new password, clear OTP
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return NextResponse.json({ success: true, message: "Password changed successfully!" });
    } catch (err) {
        console.error("change-password error:", err);
        return NextResponse.json({ success: false, message: "An error occurred." }, { status: 500 });
    }
}
