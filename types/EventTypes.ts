export type IEventType = "club" | "council" | "fest" | "workshop" | "dept" | "hackathon" | "others";

export interface IEventCard {
    title: string,
    hostedBy?: string,
    eventId: string,
    date: string,
}

export interface IEvent {
    _id: string,
    title: string,
    hosterId: string,
    hostedBy: string,
    eventType: IEventType,
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