import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { verifyAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        const user = verifyAuth(req);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        await connectDB();

        // Parse URL query filters
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const limit = searchParams.get("limit") || 100;

        const filter = status && status !== 'all' ? { status } : {};

        const appointments = await Appointment.find(filter)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .select("-__v");

        return NextResponse.json(
            { success: true, count: appointments.length, data: appointments },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching appointments:", err);
        return NextResponse.json(
            { success: false, message: "Failed to fetch appointments." },
            { status: 500 }
        );
    }
}
