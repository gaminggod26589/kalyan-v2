import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";

// Minimal env parser for the seed script since it runs outside Next.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvLocal() {
    try {
        const envPath = path.resolve(__dirname, "../.env.local");
        const envFile = fs.readFileSync(envPath, "utf8");
        envFile.split("\n").forEach((line) => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                process.env[match[1]] = match[2];
            }
        });
    } catch (e) {
        console.error("❌ Could not read .env.local completely.");
    }
}

loadEnvLocal();

const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI) {
    console.error("❌ Please define MONGO_URI in .env.local");
    process.exit(1);
}

// Inline schema to keep the script self-contained
const adminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["owner", "admin"], default: "admin" },
});
const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function seedOwner() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB.");

        const existingOwner = await AdminUser.findOne({ role: "owner" });
        if (existingOwner) {
            console.log(`⚠️ An owner account already exists (${existingOwner.email}). Skipping seed.`);
            process.exit(0);
        }

        console.log("\n--- Creating the first Owner Account ---");
        const name = await question("Name: ");
        const email = await question("Email: ");
        const password = await question("Password: ");

        if (!name || !email || !password) {
            console.error("❌ All fields are required.");
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newOwner = new AdminUser({
            name,
            email,
            passwordHash,
            role: "owner",
        });

        await newOwner.save();
        console.log("✅ Owner account created successfully! You can now log into the Admin Panel.");

    } catch (err) {
        console.error("❌ Complete error during seed:", err);
    } finally {
        rl.close();
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedOwner();
