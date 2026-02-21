import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { verifyAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        const user = verifyAuth(req);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                { status: 401 }
            );
        }

        await connectDB();

        const messages = await ContactMessage.find({})
            .sort({ createdAt: -1 })
            .select("-__v");

        return NextResponse.json(
            { success: true, count: messages.length, data: messages },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching messages:", err);
        return NextResponse.json(
            { success: false, message: "Failed to fetch messages." },
            { status: 500 }
        );
    }
}
