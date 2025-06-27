import EventCard from "@/components/ui/EventCard";
import FirstTitle from "@/components/ui/FIrstTItle";
import ThirdTitle from "@/components/ui/ThirdTItle";
import AvatarCircle from "@/components/ui/AvatarCircle";
import Carousel from "@/components/ui/Carousal";
import Navbar from "@/components/shared/mainpage/Navbar";
import PopularHosters from "@/components/shared/mainpage/PopularHosters";

export default function Page() {
  // Sample data for featured events
  const featuredEvents = [
    {
      title: "Tech Innovation Summit 2025",
      eventId: 1234,
      date: "2025-07-20T10:00:00"
    },
    {
      title: "Annual Hackathon Challenge",
      eventId: 1235,
      date: "2025-07-25T09:00:00"
    },
    {
      title: "Web Development Workshop",
      eventId: 1236,
      date: "2025-07-30T14:00:00"
    },
    {
      title: "AI & Machine Learning Conference",
      eventId: 1237,
      date: "2025-08-05T11:00:00"
    },
    {
      title: "Startup Pitch Competition",
      eventId: 1238,
      date: "2025-08-10T16:00:00"
    }
  ];

  // Sample data for happening today events
  const todayEvents = [
    {
      title: "Morning Coffee Networking",
      eventId: 1240,
      date: "2025-06-26T08:00:00"
    },
    {
      title: "Lunch & Learn: React Best Practices",
      eventId: 1241,
      date: "2025-06-26T12:00:00"
    },
    {
      title: "Evening Tech Talk",
      eventId: 1242,
      date: "2025-06-26T18:00:00"
    },
    {
      title: "Code Review Session",
      eventId: 1243,
      date: "2025-06-26T15:00:00"
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-secondary-2 to-30%">
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 hidden md:block">
          <Navbar />
        </div>
        <div className="md:hidden fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>


        {/* Header Section */}
        <section className="pt-24 md:pt-24  pb-12">
          <div className="container mx-auto px-6">
            <FirstTitle color="text-light" title="eventnitt" />
            <ThirdTitle color="text-secondary-3" title="explore the vast collection of events happening" />
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <ThirdTitle color="text-light" title="featured events" />
            </div>
            
            {/* Featured Events Carousel */}
            <Carousel showIndicators={true} spacing="md" className="mb-4">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event.eventId}
                  title={event.title}
                  eventId={event.eventId}
                  date={event.date}
                />
              ))}
            </Carousel>
          </div>
        </section>

        {/* Popular Posters Section */}
        <PopularHosters />

        {/* Happening Today Section */}
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <ThirdTitle color="text-light" title="happening today" />
            </div>
            
            {/* Today Events Carousel */}
            <Carousel showIndicators={true} spacing="md" className="mb-4">
              {todayEvents.map((event) => (
                <EventCard 
                  key={event.eventId}
                  title={event.title}
                  eventId={event.eventId}
                  date={event.date}
                />
              ))}
            </Carousel>
          </div>
        </section>
      </main>

    </>
  );
}