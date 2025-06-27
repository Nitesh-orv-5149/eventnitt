import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Hoster from "@/models/hoster.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const hosters = await Hoster.find({},"_id organisation")

    return NextResponse.json({ success: true, hosters });
  } catch (error: any) {
    console.error("[GET HOSTERS ERROR]:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
