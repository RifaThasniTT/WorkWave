import mongoose, { Schema, Types } from "mongoose";

export interface IEducationEntry {
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
    grade?: number;
}

export interface IEducation extends Document {
    userId: Types.ObjectId;
    education: IEducationEntry[];
    createdAt: Date;
    updatedAt: Date;
}

const EducationSchema: Schema<IEducation> = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    }, 
    education: [{
        school: { type: String, required: true },
        degree: { type: String, required: true },
        field: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true},
        grade: { type: Number}
    }]
});

export default mongoose.model<IEducation>("Education", EducationSchema);