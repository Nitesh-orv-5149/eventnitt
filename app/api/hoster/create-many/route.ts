import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { connectDB } = await import("@/lib/mongoose");
    const { default: Hoster } = await import("@/models/hoster.model");

    await connectDB();

    const body = await req.json();
    const hosters = Array.isArray(body) ? body : [body]; // support both single and multiple

    const createdHosters = [];

    for (const hosterData of hosters) {
      const {
        organisation,
        description,
        email,
        password,
        phone,
        instagram,
      } = hosterData;

      // ✅ Required field validation
      if (!organisation || !email || !password || !phone || !instagram) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing required fields in one or more hosters",
          },
          { status: 400 }
        );
      }

      // ✅ Check for duplicate email
      const existingHoster = await Hoster.findOne({ email });
      if (existingHoster) {
        return NextResponse.json(
          { success: false, message: `Email ${email} already registered` },
          { status: 409 }
        );
      }

      // ✅ Hash the password
      const hashedPassword = await hash(password, 10);

      // ✅ Create hoster
      const createdHoster = await Hoster.create({
        organisation,
        description,
        email,
        password: hashedPassword,
        phone,
        instagram,
      });

      // ✅ Omit password from response
      const { password: _, ...hosterWithoutPassword } = createdHoster.toObject();

      createdHosters.push(hosterWithoutPassword);
    }

    return NextResponse.json(
      { success: true, hosters: createdHosters },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ Error creating hosters:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
