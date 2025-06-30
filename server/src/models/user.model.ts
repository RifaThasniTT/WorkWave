import mongoose, { Document, Schema, Types } from "mongoose"

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    headline?: string;
    location?: string;
    about?: string;
    otp?: string;
    otpExpiry?: Date;
    resetToken?: string;
    resetTokenExpiry?: Date;
    resumeUrl?:string;
    isVerified: boolean,
    isBlocked: boolean;
    profileImage?: string;
    education: Types.ObjectId;
    experience: Types.ObjectId;
    skills: string[];
    isSubscribed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema ({
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
    },
    googleId: {
        type: String
    },
    headline: {
        type: String
    },
    location: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    about: {
        type: String,
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date,
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiry: {
        type: Date
    },
    resumeUrl: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    education: {
        type: Schema.Types.ObjectId,
        ref: "Education"
    },
    experience: {
        type: Schema.Types.ObjectId,
        ref: "Experience"
    },
    skills: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>("User", UserSchema);
