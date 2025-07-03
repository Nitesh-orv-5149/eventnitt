'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, Hash, ExternalLink, Instagram } from 'lucide-react';
import { IEvent } from '@/types/EventTypes';

const currentUserId = 'current-user-id'; // Replace with real session/user info if available

export default function EventViewPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') fetchEvent(id);
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/event/${eventId}`);
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to load event');

      setEvent(data.data);
      setIsRegistered(data.data.registeredUsers?.includes(currentUserId) || false);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async () => {
    if (!event) return;
    try {
      setRegistering(true);
      const res = await fetch(`/api/event/${event._id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId }),
      });
      if (!res.ok) throw new Error('Registration failed');
      setIsRegistered(true);
      fetchEvent(event._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRegistering(false);
    }
  };

  const getEventTypeColor = (type: IEvent['eventType']) => {
    const colors: Record<IEvent['eventType'], string> = {
      club: 'bg-blue-500',
      council: 'bg-green-500',
      fest: 'bg-purple-500',
      workshop: 'bg-orange-500',
      dept: 'bg-red-500',
      hackathon: 'bg-yellow-500',
      others: 'bg-gray-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-1/50 via-black to-secondary-1/50 text-white">
      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-1 mx-auto mb-4" />
            <p className="text-gray-400">Loading event...</p>
          </div>
        ) : event ? (
          <div className="bg-gray-900 rounded-4xl border border-gray-700 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full font-bold text-white text-sm ${getEventTypeColor(event.eventType)}`}>
                  {event.eventType}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2 text-primary-1">{event.title}</h1>
              <p className="text-xl text-gray-300">Hosted by {event.hostedBy}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-secondary-1" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-gray-400">{event.date}</p>
                    {event.endDate && <p className="text-gray-400">to {event.endDate}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-secondary-1" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-400">{event.time}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-secondary-1" />
                  <div>
                    <p className="font-semibold">Venue</p>
                    <p className="text-gray-400">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary-1">About This Event</h2>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 bg-secondary-1 text-white rounded-full text-sm">
                      <Hash size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-secondary-2 text-white rounded-full hover:bg-secondary-1 transition-colors"
                >
                  <ExternalLink size={18} />
                  Registration Link
                </a>
              )}

              {event.instagramLink && (
                <a
                  href={event.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-secondary-2 text-white rounded-full hover:bg-secondary-3 transition-colors"
                >
                  <Instagram size={18} />
                  Instagram
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
