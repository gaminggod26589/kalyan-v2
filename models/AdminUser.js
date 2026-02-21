import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, required: true, enum: ["owner", "admin"], default: "admin" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
        otp: { type: String, default: null },
        otpExpiry: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.AdminUser ||
    mongoose.model("AdminUser", adminUserSchema);
