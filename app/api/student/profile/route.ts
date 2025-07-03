import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Student from "@/models/student.model";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ success: false, message: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "devsecret");

    const student = await Student.findById(decoded.id); // No populate here

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    const { password, ...studentData } = student.toObject();
    return NextResponse.json({ success: true, student: studentData });
  } catch (err: any) {
    console.error("Profile fetch error:", err.message);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
