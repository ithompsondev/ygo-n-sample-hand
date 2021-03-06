import mongoose from 'mongoose';
import cardSchema from './schema/card.js';

export default class CardDB {
    constructor() {
        this.db = null;
        this.Card = null;
        this.exclude = '-_id -__v'; // fields to exclude when querying the database
    }

    connect(uri) {
        return new Promise(async (resolve,reject) => {
            try {
                this.db = await mongoose.createConnection(uri);
                console.log(`Connected to Card DB`);
                resolve(this); // We can method chain off of this promise to load the card model
            } catch (err) {
                console.log(`Could not connect to Card DB`);
                reject(err);
            }
        });
    }

    loadCardModel() {
        this.Card = this.db.model('Card',cardSchema);
    }

    insertCard(cardResponse) {
        // cardResponse is a card object
        const card = new this.Card(cardResponse);
        return card.save(); // returning a promise
    }

    cardExists(cardName) {
        return new Promise(async (resolve,reject) => {
            try {
                const card = await this.Card.findOne({ name: cardName },this.exclude).lean();
                if (card != null) {
                    resolve(card);
                } else {
                    resolve(false);
                }
            } catch (err) {
                console.log(err);
                reject(false);
            }
        });
    }

    isLink(cardType) {
        return cardType == 'Link Monster';
    }

    isPendulum(cardType) {
        return cardType == 'Pendulum Normal Monster' || cardType == 'Pendulum Effect Monster';
    }

    isSpell(cardType) {
        return cardType == 'Spell Card';
    }

    isTrap(cardType) {
        return cardType == 'Trap Card';
    }
}