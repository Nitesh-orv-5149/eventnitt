'use client';

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import EventCard from "@/components/ui/EventCard";
import { IEventCard } from "@/types/EventTypes";

const EVENT_TYPES = ["club", "council", "fest", "workshop", "dept", "hackathon", "others"];

export default function SearchPage() {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & controls
  const [query, setQuery] = useState("");
  const [eventType, setEventType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState<"date" | "createdAt">("date");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // fixed page size

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
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
          console.log(data.data)
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
  }, [query, eventType, dateFrom, dateTo, sort, order, page, limit]);

  // Handlers
  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPage(1); // reset page on search change
  }
  function onEventTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setEventType(e.target.value);
    setPage(1);
  }
  function onDateFromChange(e: ChangeEvent<HTMLInputElement>) {
    setDateFrom(e.target.value);
    setPage(1);
  }
  function onDateToChange(e: ChangeEvent<HTMLInputElement>) {
    setDateTo(e.target.value);
    setPage(1);
  }
  function onSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as "date" | "createdAt");
  }
  function onOrderChange(e: ChangeEvent<HTMLSelectElement>) {
    setOrder(e.target.value as "asc" | "desc");
  }

  // Pagination controls
  function goPrev() {
    setPage((p) => Math.max(1, p - 1));
  }
  function goNext() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <section className="w-full max-w-4xl mb-6 space-y-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={onSearchChange}
          className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={eventType}
            onChange={onEventTypeChange}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm"
          >
            <option value="">All Event Types</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-secondary-1 selection:bg-secondary-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <label>
            From:{" "}
            <input
              type="date"
              value={dateFrom}
              onChange={onDateFromChange}
              className="border border-gray-300 rounded px-2 py-1 shadow-sm"
            />
          </label>

          <label>
            To:{" "}
            <input
              type="date"
              value={dateTo}
              onChange={onDateToChange}
              className="border border-gray-300 rounded px-2 py-1 shadow-sm"
            />
          </label>

          <select
            value={sort}
            onChange={onSortChange}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="createdAt">Sort by Created At</option>
          </select>

          <select
            value={order}
            onChange={onOrderChange}
            className="border border-gray-300 rounded px-3 py-2 shadow-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </section>

      {/* Events List */}
      <section className="w-full flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => <EventCard 
                                    key={event.eventId}
                                    title={event.title}
                                    eventId={event.eventId}
                                    hostedBy={event.hostedBy}
                                    date={event.date}
                                />)
        )}
      </section>

      {/* Pagination Controls */}
      <section className="mt-8 flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </section>
    </main>
  );
}
