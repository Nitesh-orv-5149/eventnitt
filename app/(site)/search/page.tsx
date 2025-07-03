'use client';

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import EventCard from "@/components/ui/EventCard";
import { IEventCard } from "@/types/EventTypes";
import FormInput from "@/components/ui/FormInput";

const EVENT_TYPES = ["club", "council", "fest", "workshop", "dept", "hackathon", "others"];

export default function SearchPage() {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [eventType, setEventType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState<"date" | "createdAt">("date");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [showFilters, setShowFilters] = useState(false); // collapsible toggle

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const params = {
          query: query || undefined,
          eventType: eventType || undefined,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
          sort,
          order,
          page,
          limit,
        };

        const { data } = await axios.get("/api/event/all", { params });

        if (data.success) {
          setEvents(data.data);
          setTotalPages(data.pagination.totalPages);
        } else {
          setError("Failed to fetch events.");
          setEvents([]);
          setTotalPages(1);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching events.");
        setEvents([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [query, eventType, dateFrom, dateTo, sort, order, page]);

  const handleInputChange = (setter: (val: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      setPage(1);
    };

  return (
    <main className="min-h-screen p-6">
      {/* Filters Section */}
      <section className="w-full max-w-5xl mx-auto mb-10">
        {/* Toggle for small/medium screens */}
        <div className="lg:hidden mb-4 flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-secondary-2 text-white rounded-full"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Box */}
        <div className={`transition-all duration-300 ${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="bg-white/10 p-6 rounded-xl shadow-md space-y-6">
            <FormInput
              label="Search"
              name="query"
              value={query}
              onChange={handleInputChange(setQuery)}
              placeholder="Search events..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormInput
                label="Event Type"
                name="eventType"
                as="select"
                value={eventType}
                onChange={handleInputChange(setEventType)}
                options={["", ...EVENT_TYPES]}
              />

              <FormInput
                label="From Date"
                name="dateFrom"
                type="date"
                value={dateFrom}
                onChange={handleInputChange(setDateFrom)}
              />

              <FormInput
                label="To Date"
                name="dateTo"
                type="date"
                value={dateTo}
                onChange={handleInputChange(setDateTo)}
              />

              <FormInput
                label="Sort By"
                name="sort"
                as="select"
                value={sort}
                onChange={handleInputChange((val: string) => setSort(val as "date" | "createdAt"))}
                options={["date", "createdAt"]}
              />

              <FormInput
                label="Order"
                name="order"
                as="select"
                value={order}
                onChange={handleInputChange((val: string) => setOrder(val as "asc" | "desc"))}
                options={["asc", "desc"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Cards */}
      <section className="w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.eventId}
              title={event.title}
              eventId={event.eventId}
              hostedBy={event.hostedBy}
              date={event.date}
            />
          ))
        )}
      </section>

      {/* Pagination */}
      <section className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-secondary-2 text-white rounded-full disabled:bg-secondary-1"
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-secondary-2 text-white rounded-full disabled:bg-secondary-1"
        >
          Next
        </button>
      </section>
    </main>
  );
}
