import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bcrypt = await import("bcryptjs");
    const jwt = await import("jsonwebtoken");
    const { connectDB } = await import("@/lib/mongoose");
    const Student = (await import("@/models/student.model")).default;

    await connectDB();

    const { email, password } = await req.json();

    const student = await Student.findOne({ email });

    if (!student) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );

    // send full session object
    const session = {
      token,
      user: {
        id: student._id,
        email: student.email,
        fullName: student.fullName,
        role: student.role,
      },
    };

    return NextResponse.json({ success: true, session });
  } catch (err: any) {
    console.error("Signin error:", err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
