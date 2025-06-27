export type EventType = "club" | "council" | "fest" | "workshop" | "dept" | "others";

export interface IEventCard {
    title: string,
    hostedBy?: string,
    eventId: number,
    date: string,
}

export interface IEvent {
    _id: string,
    title: string,
    hosterId: string,
    hostedBy: string,
    eventType: EventType,
    date: string,
    endDate?: string,
    time: string;
    venue: string;
    description: string,
    tags: string[],
    instagramLink?: string,
    registeredUsers: string[],
    registrationLink: string,
}