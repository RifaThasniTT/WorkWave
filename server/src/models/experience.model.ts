import mongoose, { Schema, Types } from "mongoose";
import { title } from "process";

export interface IExperienceEntry {
    company: string;
    title: string;
    employmentType: "Part Time" | "Full Time" | "Intern" | "Contract";
    location?: string;
    locationType?: "Remote" | "Onsite" | "Hybrid";
    isPresent: Boolean;
    startDate: Date;
    endDate?: Date;
}

export interface IExperience extends Document {
    userId: Types.ObjectId;
    experience: IExperienceEntry[];
    createdAt: Date;
    updatedAt: Date;
}

const ExperienceSchema: Schema<IExperience> = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    experience: [{
        company: { type: String, required: true },
        title: { type: String, required: true },
        employmentType: { type: String, enum: ["Part Time", "Full Time", "Intern", "Contract"], required: true },
        location: { type: String },
        locationType: { type: String, enum: ["Remote", "Onsite", "Hybrid"]},
        isPresent: { type: Boolean, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date }
    }]
}, {
    timestamps: true
});

export default mongoose.model<IExperience>("Experience", ExperienceSchema);