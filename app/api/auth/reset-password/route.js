import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, otp, newPassword } = await req.json();
        if (!email || !otp || !newPassword) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }
        if (newPassword.length < 6) {
            return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
        }

        await connectDB();
        const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid code or email." }, { status: 400 });
        }
        if (!user.otp || user.otp !== otp) {
            return NextResponse.json({ success: false, message: "Invalid verification code." }, { status: 400 });
        }
        if (!user.otpExpiry || user.otpExpiry < new Date()) {
            return NextResponse.json({ success: false, message: "Code has expired. Please request a new one." }, { status: 400 });
        }

        user.passwordHash = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return NextResponse.json({ success: true, message: "Password reset successfully! You can now log in." });
    } catch (err) {
        console.error("reset-password error:", err);
        return NextResponse.json({ success: false, message: "An error occurred." }, { status: 500 });
    }
}
