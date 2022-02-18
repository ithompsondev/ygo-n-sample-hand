import express from 'express'
import Deck from '../scripts/deck.js'
import Card from '../scripts/card.js'
import { parseDeck } from '../scripts/deckparse.js'

export const deckRouter = express.Router()

deckRouter.get('/:deckName',(req,res) => {

})

deckRouter.post('/create',(req,res) => {
    // TODO: Error checking
    const deckName = req.body.deckName
    const deckList = req.body.deckList
    const deck = parseDeck(deckList)

    // How do we maintain the decklist for this user?
    res.redirect('/decks/:deckName')
})