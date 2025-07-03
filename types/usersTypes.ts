import { IEventType } from "./EventTypes";

export type Role = "student" | "hoster";

export interface IStudent {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: Role;
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
    password: string;
    role: Role;
    phone: string;
    hostedEvents: string[]; 
    instagram: string
}