import mongoose from 'mongoose'
import cardSchema from './schema/card.js'

export default class CardDB {
    constructor() {
        this.db = null
        this.Card = null
        this.requiredFields = 'name art art_small description'
    }

    connect(uri) {
        return new Promise(async (resolve,reject) => {
            try {
                this.db = await mongoose.createConnection(uri)
                console.log(`Connected to DB: ${uri}`)
                resolve(this) // We can method chain off of this promise to load the card model
            } catch (err) {
                console.log(`Could not connect to DB: ${uri}`)
                reject(err)
            }
        })
    }

    loadCardModel() {
        this.Card = this.db.model('Card',cardSchema)
    }

    insertCard(cardResponse) {
        // cardResponse is an array of object literals representing cards
        for (let i = 0; i < cardResponse.length; i++) {
            const card = cardResponse[i]
            const newCard = new this.Card(card)
            newCard.save().then(() => console.log(`Inserted: ${cardResponse.name}`))
        }
    }

    // TODO: HOW TO ONLY GET NECESSARY INFORMATION FROM A QUERY
    cardExists(cardName) {
        return new Promise(async (resolve,reject) => {
            try {
                const card = await this.Card.findOne({ name: cardName }, this.requiredFields)
                // api/card view expects and array of object literals
                resolve([card])
            } catch (err) {
                console.log(err)
                reject(false)
            }
        })
    }
}