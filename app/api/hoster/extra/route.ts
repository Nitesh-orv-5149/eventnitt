import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { connectDB } = await import("@/lib/mongoose");
    const { default: Hoster } = await import("@/models/hoster.model");

    await connectDB();

    const result = await Hoster.updateMany(
      { role: { $exists: false } },
      { $set: { role: "hoster" } }
    );

    return NextResponse.json({
      success: true,
      message: `✅ Updated ${result.modifiedCount} hosters.`,
    });
  } catch (err: any) {
    console.error("❌ Failed to patch hoster roles:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
