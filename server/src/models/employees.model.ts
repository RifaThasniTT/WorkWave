import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEmployee extends Document {
    name: string;
    companyId: Types.ObjectId;
    role: "hr" | "interviewer" | "admin";
    status: "invited" | "active" |"removed";
    email: string;
    password: string;
    isSubscribed: boolean;
    createdAt: string;
    updatedAt: string;
}

const EmployeeSchema:Schema<IEmployee> = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    status: {
        type: String,
        requried: true,
        enum: ["invited", "active", "removed"]
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "hr", "interviewer"]
    },
    isSubscribed: {
        type: Boolean,
        requried: true,
        default: false,
    }
});

export default mongoose.model<IEmployee>("Employees", EmployeeSchema);