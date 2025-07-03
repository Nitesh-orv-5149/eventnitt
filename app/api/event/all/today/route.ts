import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  try {
    const { default: Event } = await import("@/models/event.model");
    await connectDB();

    // Get today's date as a string like "2025-07-05"
    const today = new Date().toISOString().slice(0, 10);

    const events = await Event.find({
      date: { $lte: today },
    }).select("_id title hostedBy date");

    console.log(events,today)

    return NextResponse.json({ success: true, events }, { status: 200 });

  } catch (err: any) {
    console.error("❌ Error fetching today's events:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
