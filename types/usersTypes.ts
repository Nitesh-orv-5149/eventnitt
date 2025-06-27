import { EventType } from "./EventTypes";

export interface IStudent {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    rollNumber: string;
    department: string;
    year: number;
    registeredEvents: string[]; 
    bookMarkedEvents: string[];      
}

export interface IHoster {
    _id: string;
    organisation: string;
    description?: string;
    email: string;
    phone: string;
    hostedEvents: string[]; 
    instagram: string
}