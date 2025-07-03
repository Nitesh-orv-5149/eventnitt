import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bcrypt = await import("bcryptjs");
    const jwt = await import("jsonwebtoken");
    const { connectDB } = await import("@/lib/mongoose");
    const Hoster = (await import("@/models/hoster.model")).default;

    await connectDB();

    const { email, password } = await req.json();

    const hoster = await Hoster.findOne({ email });

    if (!hoster) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, hoster.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: hoster._id, role: hoster.role },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    const session = {
      token,
      user: {
        id: hoster._id,
        email: hoster.email,
        organisation: hoster.organisation,
        role: hoster.role,
      },
    };

    return NextResponse.json({ success: true, session });
  } catch (err: any) {
    console.error("Hoster signin error:", err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
