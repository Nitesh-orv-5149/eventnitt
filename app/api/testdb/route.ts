import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: "MongoDB connected" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Connection failed" }, { status: 500 });
  }
}
