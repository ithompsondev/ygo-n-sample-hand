import express from 'express'
import { parseDeck } from '../scripts/deckparse.js'
import { sample } from '../scripts/sample.js'
import { queryCard,queryCards,displayMeaningfulData } from '../scripts/ygo/ygocard.js'
import CardDB from '../db/carddb.js'

// TODO: TO SAVE DECKLISTS, CREATE USER AUTHENTICATION, OTHERWISE ONLY ONE DECK CAN CURRENTLY BE WORKED ON
// TODO: VIEW FOR DECKLIST PAGE TO VIEW CURRENTLY SAVED MAIN DECKS
// TODO: VIEW FOR EDITING CURRENTLY SAVED MAIN DECKS

export const deckRouter = express.Router()
// We connect to the carddb whenever this route is mounted
// We then chain then() and catch() to load the card model to this db or log any errors
const cardDB = new CardDB()
cardDB
    .connect('mongodb://localhost/cards')
    .then(
        (db) => { db.loadCardModel() }
    )
    .catch(
        (err) => { console.log(err) }
    )

deckRouter.post('/create',(req,res) => {
    // TODO: Error checking
    const deckName = req.body.deckName
    const deckList = req.body.deckList
    // We save the new deck inside our session object that persists
    req.session.deck = parseDeck(deckList)
    req.session.deckName = deckName
    res.redirect(`/deck/${deckName}/decklist`)
})

// test the ygo api
deckRouter.get('/api/card/:cardName', async (req,res) => {
    try {
        const cardName = req.params.cardName
        let cardResponse = await cardDB.cardExists(cardName)
        if (cardResponse) {
            console.log(`The card: ${cardName} already exists in the DB`)
        } else {
            console.log(`The card: ${cardName}, does not exist in the DB. Adding ...`)
            cardResponse = await queryCard(cardName)
            cardDB.insertCard(cardResponse)
        }
        res.render('api/card',{ cardName: cardName,cardData: cardResponse })
    } catch (err) {
        res.render('api/error',{ error: err })
    }
})

deckRouter.get('/api/deck/:deckName', async (req,res) => {
    try {
        const deckName = req.params.deckName
        const cardNames = req.session.deck
        const cardsResponse = await queryCards(cardNames)
        displayMeaningfulData(cardsResponse)
        res.render('api/card',{ cardName: deckName,cardData: cardsResponse })
    } catch (err) {
        res.render('api/error',{ error: err })
    }
})

deckRouter.get('/:deckName/samples', async (req,res) => {
    let hands = sample(req.session.deck)
    // Fetch card image urls
    //await getCardImages(req.session.deck)
    res.render('deck/sample',{ hands: hands })
})

deckRouter.get('/:deckName/decklist',(req,res) => {
    const deck = req.session.deck
    const name = req.session.deckName
    res.render('deck/decklist',{ name: name,deck: deck })
})