import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { verifyAuth } from "@/lib/auth";

export async function PATCH(req, { params }) {
    try {
        const user = verifyAuth(req);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const body = await req.json();
        const { isRead } = body;
        const { id } = await params;

        const updated = await ContactMessage.findByIdAndUpdate(
            id,
            { isRead },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updated },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating message:", err);
        return NextResponse.json(
            { success: false, message: "Failed to update message" },
            { status: 500 }
        );
    }
}
