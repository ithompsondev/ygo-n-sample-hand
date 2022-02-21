import express from 'express'
import { parseDeck } from '../scripts/deckparse.js'
import { sample } from '../scripts/sample.js'
import { queryCard,queryCards,displayMeaningfulData } from '../scripts/ygo/ygocard.js'

export const deckRouter = express.Router()

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
        const cardResponse = await queryCard(cardName)
        console.log(cardResponse)
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