import express from 'express'
import { parseDeck } from '../scripts/deckparse.js'
import { sample } from '../scripts/sample.js'

export const deckRouter = express.Router()

deckRouter.post('/create',(req,res) => {
    // TODO: Error checking
    const deckName = req.body.deckName
    const deckList = req.body.deckList
    // We save the new deck inside our session object that persists
    req.session.deck = parseDeck(deckList)
    req.session.deckName = deckName
    res.redirect(`/deck/${deckName}`)
})

deckRouter.get('/samples',(req,res) => {
    let hands = sample(req.session.deck)
    res.render('deck/sample',{ hands: hands })
})

deckRouter.get('/:deckName',(req,res) => {
    const deck = req.session.deck
    const name = req.session.deckName
    res.render('deck/decklist',{ name: name,deck: deck })
})