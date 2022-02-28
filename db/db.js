import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const cardURI = `mongodb+srv://ygo-db-admin:${process.env.MONGO_ATLAS_PASSWORD}@ygo-sampler.tf5c5.mongodb.net/ygo-card?retryWrites=true&w=majority`;
export const sessionURI = `mongodb+srv://ygo-db-admin:${process.env.MONGO_ATLAS_PASSWORD}@ygo-sampler.tf5c5.mongodb.net/mongo-sessions?retryWrites=true&w=majority`;
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