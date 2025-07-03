import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { IEventCard } from "@/types/EventTypes";

export async function GET(req: NextRequest) {
  try {
    const { default: Event } = await import("@/models/event.model");
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Query params
    const query = searchParams.get("query")?.trim() || "";
    const eventType = searchParams.get("eventType") || "";
    const dateFrom = searchParams.get("dateFrom") || ""; // inclusive
    const dateTo = searchParams.get("dateTo") || ""; // inclusive
    const sort = searchParams.get("sort") || "date"; // default sort by date
    const order = searchParams.get("order") === "desc" ? -1 : 1;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    // MongoDB filter
    const filter: any = {};

    // Search logic
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { hostedBy: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    // Filter by eventType
    if (eventType) {
      filter.eventType = eventType;
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = dateFrom;
      if (dateTo) filter.date.$lte = dateTo;
    }

    // Fetch matching events
    const events = await Event.find(filter, "_id title hostedBy date")
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total for pagination
    const total = await Event.countDocuments(filter);

    // Format response
    const formatted: IEventCard[] = events.map((event: any) => ({
      eventId: event._id.toString(),
      title: event.title,
      hostedBy: event.hostedBy,
      date: event.date,
    }));

    return NextResponse.json(
      {
        success: true,
        data: formatted,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Error in event listing:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
