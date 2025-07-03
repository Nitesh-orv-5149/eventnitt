import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  try {
    const { default: Event } = await import("@/models/event.model");
    await connectDB();

    const events = await Event.aggregate([
      { $sample: { size: 6 } }, 
      { $project: { _id: 1, title: 1, hostedBy: 1, date: 1 } }
    ]);

    return NextResponse.json({ success: true, events }, { status: 200 });

  } catch (err: any) {
    console.error("❌ Error fetching featured events:", err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
