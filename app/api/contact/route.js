import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        const contactMessage = new ContactMessage({
            name,
            email,
            subject,
            message,
        });

        await contactMessage.save();

        return NextResponse.json(
            { success: true, message: "Message sent! We'll get back to you soon." },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error saving contact message:", err);
        return NextResponse.json(
            { success: false, message: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}
