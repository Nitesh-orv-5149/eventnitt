import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { connectDB } = await import("@/lib/mongoose");
    const { default: Student } = await import("@/models/student.model");

    await connectDB();

    const body = await req.json();
    const {
      fullName,
      email,
      password,
      phone,
      rollNumber,
      department,
      year,
    } = body;

    if (
      !fullName ||
      !email ||
      !password ||
      !phone ||
      !rollNumber ||
      !department ||
      !year
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const createdStudent = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      rollNumber,
      department,
      year,
    });

    const { password: _, ...studentWithoutPassword } =
      createdStudent.toObject();

    return NextResponse.json(
      { success: true, student: studentWithoutPassword },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Error creating student:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
