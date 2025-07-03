"use client"

import Carousel from "@/components/ui/Carousal";
import EventCard from "@/components/ui/EventCard";
import { IEventCard } from "@/types/EventTypes";
import axios from "axios";
import { useEffect, useState } from "react";


export default function EventsFeatured() {
  const [featuredEvents, setFeaturedEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchfeaturedEvents = async () => {
      try {
        const res = await axios.get("/api/event/all/featured");
        if (res.data.success) {
          setFeaturedEvents(
            res.data.events.map((e: any) => ({
              eventId: e._id,
              title: e.title,
              hostedBy: e.hostedBy,
              date: e.date,
            }))
          );
        }
        console.log(res.data)
      } catch (err) {
        console.error("❌ Failed to fetch today's events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchfeaturedEvents();
  }, []);

  return (
    <Carousel showIndicators={true} spacing="md" className="mb-4">
    {featuredEvents.map((event) => (
      <EventCard 
        key={event.eventId}
        title={event.title}
        eventId={event.eventId}
        hostedBy={event.hostedBy}
        date={event.date}
      />
    ))}
  </Carousel>
  )
}
