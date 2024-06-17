import { Request } from "express";

export interface UserType {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestWithUser extends Request {
    user?: {
        id: string; // add fiedls as per requirements
    };
}
