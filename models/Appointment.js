import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        service: { type: String, required: true },
        date: { type: String, required: true }, // stored as YYYY-MM-DD string
        time: { type: String, required: true },
        message: { type: String, default: "" },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "confirmed", "cancelled"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Appointment ||
    mongoose.model("Appointment", appointmentSchema);
