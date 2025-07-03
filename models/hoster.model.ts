import mongoose, { Schema, model, models, Document } from "mongoose";
import { IHoster } from "@/types/usersTypes";

interface IHosterModel extends Omit<IHoster, "_id">, Document {}

const HosterSchema = new Schema<IHosterModel>(
  {
    organisation: { type: String, required: true },
    description: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["student", "hoster"], default: "hoster" },
    phone: { type: String, required: true },
    hostedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    instagram: { type: String, required: true },
  },
  { timestamps: true }
);

const Hoster = models.Hoster || model<IHosterModel>("Hoster", HosterSchema);
export default Hoster;
