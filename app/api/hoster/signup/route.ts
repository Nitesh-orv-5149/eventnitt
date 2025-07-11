import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { connectDB } = await import("@/lib/mongoose");
    const { default: Hoster } = await import("@/models/hoster.model");

    await connectDB();

    const body = await req.json();
    const {
      organisation,
      description,
      email,
      password,
      phone,
      instagram,
    } = body;

    // Basic required fields check
    if (!organisation || !email || !password || !phone || !instagram) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create Hoster
    const createdHoster = await Hoster.create({
      organisation,
      description,
      email,
      password: hashedPassword,
      phone,
      instagram,
    });

    // Don't return hashed password
    const { password: _, ...hosterWithoutPassword } = createdHoster.toObject();

    return NextResponse.json(
      { success: true, hoster: hosterWithoutPassword },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Error creating hoster:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
