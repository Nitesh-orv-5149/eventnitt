import { IEventCard } from "@/types/EventTypes";

export default function EventCard({
    title,
    eventId,
    date
}: IEventCard) {
    // Format date to a more readable format
    const formatDate = (dateString: string) => {
        const eventDate = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        return eventDate.toLocaleDateString('en-US', options);
    };

    const formatTime = (dateString: string) => {
        const eventDate = new Date(dateString);
        return eventDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="group w-50 h-60 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ">
            {/* Header with Date Badge */}
            <div className="relative h-20 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between p-6">
                <div className="text-white">
                    <div className="text-sm font-medium opacity-90">Event</div>
                    <div className="text-lg font-bold">#{eventId}</div>
                </div>
                
                {/* Date badge */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                        {formatDate(date).split(' ')[0]}
                    </div>
                    <div className="text-lg font-bold text-white leading-none">
                        {formatDate(date).split(' ')[1]}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-colors duration-200">
                        {title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{formatTime(date)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}