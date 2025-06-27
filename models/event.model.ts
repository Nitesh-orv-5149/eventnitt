import mongoose, { Schema, model, models, Document } from "mongoose";
import { IEvent } from "@/types/EventTypes";

interface IEventModel extends Omit<IEvent, "_id">, Document {}

const EventSchema = new Schema<IEventModel>(
  {
    title: { type: String, required: true },
    hosterId: { type: String, required: true },
    hostedBy: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["club", "council", "fest", "workshop", "dept", "others"],
      required: true,
    },
    date: { type: String, required: true },
    endDate: { type: String },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    instagramLink: { type: String },
    registeredUsers: [{ type: String }],
    registrationLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = models.Event || model<IEventModel>("Event", EventSchema);
export default Event;

