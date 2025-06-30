import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { connectDB } = await import("@/lib/mongoose");
    const { default: Hoster } = await import("@/models/hoster.model");

    await connectDB();

    const hosters = await Hoster.find({}, "_id organisation");

    return NextResponse.json({ success: true, hosters });
  } catch (error: any) {
    console.error("[GET HOSTERS ERROR]:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
