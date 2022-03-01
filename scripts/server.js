import express from 'express';
import session from 'express-session';
import connMongoSession from 'connect-mongodb-session';
import { connectSessionDB,sessionURI } from '../db/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8000;
export const host = process.env.HOST || 'localhost';

export function setup() {
    return express();
}

export function useEJS(server) {
    server.set('view engine','ejs');
}

export function useCORS(server) {
    // Specify the origin of the react app frontend
    server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
}

export function accessRequestBody(server) {
    // Allows us to access the request body to get form information
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
}

export function mountRouter(server,mount,router) {
    server.use(mount,router);
}

export function initSessions(server) {
    // Setting up sessions with Mongodb store
    const MongoSession = connMongoSession(session);
    server.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false,maxAge: 7 * 24 * 60 * 60 * 1000 },
        store: new MongoSession({
            uri: sessionURI,
            collection: 'sessions'
        })
    }));
}

export async function connectSessions() {
    const db = await connectSessionDB();
    if (db) {
        console.log('Connected to sessionsDB');
        return db;
    } else {
        console.log('Could not connect to sessionsDB')
        return db;
    }
}