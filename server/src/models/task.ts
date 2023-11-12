import mongoose, { Schema, Document, mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface TaskModel extends Document {
    id: string;
    title: string;
    type: "Design" | "Front-end" | "Back-end" | "Devops";
    description: string;
    subtitle: string; // can be date, or any smaller description
    status: "To Start" | "In Progress" | "Done";
}

const taskSchema = new Schema<TaskModel>({
    id: { type: String, required: true, unique: true, default: uuidv4 },
    type: { type: String, enum: ["Design", "Front-end", "Back-end", "Devops"], required: true },
    status: { type: String, enum: ["To Start", "In Progress", "Done"] },
    title: { type: String, required: true },
    description: { type: String },
    subtitle: { type: String },
})

export const TaskModel = mongoose.model<TaskModel>("Task", taskSchema);