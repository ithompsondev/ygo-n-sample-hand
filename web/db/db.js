import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const cardURI = 'mongodb://localhost/cards';
export const sessionURI = 'mongodb://localhost/sessions';
export function connectSessionDB() {
    // mongoose.connect() returns a promise
    return new Promise(async (resolve,reject) => {
        try {
            const db = await mongoose.connect(sessionURI);
            resolve(db);
        } catch (err) {
            console.log(err);
            reject(undefined);
        }
    });
}