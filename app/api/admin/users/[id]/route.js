import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { verifyAuth, isOwner } from "@/lib/auth";

export async function PATCH(req, { params }) {
    try {
        const caller = verifyAuth(req);
        // Only owners can edit users
        if (!isOwner(caller)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Owner access required." },
                { status: 403 }
            );
        }

        await connectDB();
        const body = await req.json();
        const { name, role } = body;
        const { id } = await params;

        // We can't let an owner demote themselves if they are the last owner
        if (id === caller.id && role !== "owner") {
            return NextResponse.json(
                { success: false, message: "You cannot demote yourself." },
                { status: 400 }
            );
        }

        const updated = await AdminUser.findByIdAndUpdate(
            id,
            { name, role },
            { new: true }
        ).select("-passwordHash");

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updated },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating user:", err);
        return NextResponse.json(
            { success: false, message: "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const caller = verifyAuth(req);
        if (!isOwner(caller)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Owner access required." },
                { status: 403 }
            );
        }

        await connectDB();
        const { id } = await params;

        // Prevent deleting oneself
        if (id === caller.id) {
            return NextResponse.json(
                { success: false, message: "You cannot delete your own account." },
                { status: 400 }
            );
        }

        const deleted = await AdminUser.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error deleting user:", err);
        return NextResponse.json(
            { success: false, message: "Failed to delete user" },
            { status: 500 }
        );
    }
}
