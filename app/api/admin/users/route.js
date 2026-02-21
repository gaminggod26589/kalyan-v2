import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { verifyAuth, isOwner } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req) {
    try {
        const user = verifyAuth(req);
        // Only owners can list all users
        if (!isOwner(user)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Owner access required." },
                { status: 403 }
            );
        }

        await connectDB();

        // Do not return password hashes
        const users = await AdminUser.find({}).select("-passwordHash -__v").sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, count: users.length, data: users },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json(
            { success: false, message: "Failed to fetch users." },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const user = verifyAuth(req);
        // Only owners can create new users
        if (!isOwner(user)) {
            return NextResponse.json(
                { success: false, message: "Forbidden. Owner access required." },
                { status: 403 }
            );
        }

        await connectDB();
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existing = await AdminUser.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists." },
                { status: 409 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new AdminUser({
            name,
            email,
            passwordHash,
            role,
            createdBy: user.id
        });

        await newUser.save();

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                data: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error creating user:", err);
        return NextResponse.json(
            { success: false, message: "Failed to create user." },
            { status: 500 }
        );
    }
}
