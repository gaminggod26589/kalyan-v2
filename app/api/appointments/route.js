import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        // Basic validation
        const { name, phone, email, service, date, time, message } = body;
        if (!name || !phone || !email || !service || !date || !time) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        // Create and save the appointment
        const appointment = new Appointment({
            name,
            phone,
            email,
            service,
            date,
            time,
            message: message || "",
        });

        const saved = await appointment.save();

        return NextResponse.json(
            {
                success: true,
                message: "Appointment booked successfully! We will confirm shortly.",
                data: {
                    id: saved._id,
                    name: saved.name,
                    service: saved.service,
                    date: saved.date,
                    time: saved.time,
                    status: saved.status,
                },
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error saving appointment:", err);
        return NextResponse.json(
            { success: false, message: "Failed to save appointment. Please try again." },
            { status: 500 }
        );
    }
}
