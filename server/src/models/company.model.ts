import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICompany extends Document {
    name: string;
    email: string;
    password: string;
    kyc: string;
    otp?: string;
    otpExpiry?: Date;
    logoUrl?: string;
    website?: string;
    foundedIn?: Date;
    isVerified: boolean;
    isBlocked: boolean;
    status: "pending" | "approved" | "rejected";
    location?: string;
    about?: string;
    employees?: number;
    industry?: string;
    phone?: string;
    isSubscribed?: string;
    team: [Types.ObjectId];
    createdAt: Date;
    updatedAt: Date;
}

const CompanySchema:Schema<ICompany> = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    kyc: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    logoUrl: {
        type: String
    },
    website: {
        type: String,
    },
    foundedIn: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    location: {
        type: String,
    },
    about: {
        type: String
    },
    industry: {
        type: String,
    },
    employees: {
        type: Number,
    },
    phone: {
        type: String,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: "Employees"
    }]
}, {
    timestamps: true
});

export default mongoose.model<ICompany>("Company", CompanySchema);