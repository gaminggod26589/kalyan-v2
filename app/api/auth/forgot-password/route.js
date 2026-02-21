import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
        }

        await connectDB();
        const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });

        // Always return success to prevent email enumeration attacks
        if (!user) {
            return NextResponse.json({ success: true, message: "If this email exists, a code has been sent." });
        }

        // Generate 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
        await user.save();

        await sendOTPEmail(user.email, process.env.EMAIL_USER, process.env.EMAIL_PASS, otp);

        return NextResponse.json({ success: true, message: "If this email exists, a code has been sent." });
    } catch (err) {
        console.error("forgot-password error:", err);
        return NextResponse.json({ success: false, message: "Failed to send reset code." }, { status: 500 });
    }
}
