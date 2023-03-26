import {RequestHandler} from "express";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    userId: string;
    title: string;
    url: string;
    postedAt: number;
}

export interface Like {
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    postedAt: number;
}

type WithError<T> = T & { error: any };

export type ExpressHandler<Req, Res> = RequestHandler<string,
    Partial<WithError<Res>>,
    Partial<Req>,
    any>;

export interface JwtObject {
    userId: string;
}