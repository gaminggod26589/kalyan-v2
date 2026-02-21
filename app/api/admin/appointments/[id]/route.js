import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
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
        const { status } = body;
        const { id } = await params;

        if (!["pending", "confirmed", "cancelled"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        const updated = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Appointment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updated },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating appointment:", err);
        return NextResponse.json(
            { success: false, message: "Failed to update appointment" },
            { status: 500 }
        );
    }
}
