import mongoose, { Schema, Document, model, models } from "mongoose";
import { IStudent } from "@/types/usersTypes";

interface IStudentModel extends Omit<IStudent, "_id">, Document {}

const StudentSchema = new Schema<IStudentModel>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    bookMarkedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

const Student = models.Student || model<IStudentModel>("Student", StudentSchema);
export default Student;

