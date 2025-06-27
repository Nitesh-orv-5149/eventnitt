import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import HosterModel from "@/models/hoster.model";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const createdHoster = await HosterModel.create(body);
    return NextResponse.json({ success: true, hoster: createdHoster }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error creating hoster:", err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
