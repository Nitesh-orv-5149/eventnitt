import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    const { default: Event } = await import("@/models/event.model");
    const { default: Hoster } = await import("@/models/hoster.model");

    await connectDB();

    const body = await req.json();
    const events = Array.isArray(body) ? body : [body]; // allow single or multiple

    const createdEvents = [];

    for (const eventData of events) {
      const {
        title,
        hosterId,
        hostedBy,
        eventType,
        date,
        endDate,
        time,
        venue,
        description,
        tags,
        instagramLink,
        registrationLink,
      } = eventData;

      // Basic validation
      if (
        !title || !hosterId || !hostedBy || !eventType || !date ||
        !time || !venue || !description || !registrationLink
      ) {
        return NextResponse.json(
          { success: false, message: "Missing required fields in one of the events" },
          { status: 400 }
        );
      }

      // Check if hoster exists
      const hosterExists = await Hoster.findById(hosterId);
      if (!hosterExists) {
        return NextResponse.json(
          { success: false, message: `Hoster with ID ${hosterId} does not exist` },
          { status: 404 }
        );
      }

      // Create event
      const newEvent = await Event.create({
        title,
        hosterId,
        hostedBy,
        eventType,
        date,
        endDate,
        time,
        venue,
        description,
        tags,
        instagramLink,
        registrationLink,
      });

      // Add to hoster's hostedEvents
      hosterExists.hostedEvents.push(newEvent._id);
      await hosterExists.save();

      createdEvents.push(newEvent);
    }

    return NextResponse.json(
      { success: true, events: createdEvents },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("❌ Error creating events:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
