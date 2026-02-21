import nodemailer from "nodemailer";

export async function sendLoginAlertEmail(adminEmail, emailUser, emailPass, ipAddress = "Unknown", userAgent = "Unknown", time = new Date().toLocaleString()) {
    try {
        if (!emailUser || !emailPass) {
            console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set. Skipping login alert email.");
            return;
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // SSL
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: `"Kalyan Security" <${emailUser}>`,
            to: adminEmail, // Sending alert to the admin's email or your specific support email
            subject: "🚨 Security Alert: New Login to Admin Panel",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0f766e;">Security Alert! 🚨</h2>
                    <p>Hello,</p>
                    <p>We noticed a successful login to the <b>Kalyan Physiotherapy Admin Dashboard</b>.</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #0f766e; margin: 20px 0;">
                        <p><b>Time:</b> ${time}</p>
                        <p><b>IP Address:</b> ${ipAddress}</p>
                        <p><b>Device/Browser:</b> ${userAgent}</p>
                    </div>
                    <p style="color: #dc2626; font-weight: bold;">If this wasn't you, please change your password immediately!</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #666;">This is an automated security message from your Kalyan Physiotherapy website.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Login alert email sent successfully.");
    } catch (error) {
        console.error("❌ Failed to send login alert email:", error);
    }
}

export async function sendOTPEmail(toEmail, emailUser, emailPass, otpCode) {
    try {
        if (!emailUser || !emailPass) {
            console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set. Skipping OTP email.");
            return;
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: emailUser, pass: emailPass },
        });

        await transporter.sendMail({
            from: `"Kalyan Security" <${emailUser}>`,
            to: toEmail,
            subject: "🔐 Your Password Reset Code — Kalyan Admin",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0f766e;">Password Reset Request 🔐</h2>
                    <p>You requested to change your admin panel password. Use the code below:</p>
                    <div style="background-color: #f0fdfa; padding: 20px; border-left: 4px solid #0f766e; margin: 20px 0; text-align: center;">
                        <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0f766e; margin: 0;">${otpCode}</p>
                    </div>
                    <p style="color: #dc2626;"><b>This code expires in 10 minutes.</b></p>
                    <p>If you did not request this, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #666;">Kalyan Physiotherapy Admin System</p>
                </div>
            `,
        });

        console.log("✅ OTP email sent successfully.");
    } catch (error) {
        console.error("❌ Failed to send OTP email:", error);
        throw error; // Re-throw so the API can handle it
    }
}
