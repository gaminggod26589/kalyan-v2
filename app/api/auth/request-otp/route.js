import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "@/lib/email";

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
}

export async function POST(req) {
    try {
        // Verify JWT
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);

        await connectDB();
        const user = await AdminUser.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Generate OTP and save with 10-min expiry
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        // Send email
        await sendOTPEmail(user.email, process.env.EMAIL_USER, process.env.EMAIL_PASS, otp);

        return NextResponse.json({
            success: true,
            message: `Verification code sent to ${user.email}`,
        });
    } catch (err) {
        console.error("request-otp error:", err);
        return NextResponse.json(
            { success: false, message: "Failed to send OTP. Check email configuration." },
            { status: 500 }
        );
    }
}
