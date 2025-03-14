import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const DataSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    otp: { type: String, default: null },
    photo: { type: String, default: "" },
}, { timestamps: true, versionKey: false });

// Hash password before saving the user
DataSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export const UserModel = mongoose.model('users', DataSchema);