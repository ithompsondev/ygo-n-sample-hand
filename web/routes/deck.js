import express from 'express';
import { parseDeck } from '../scripts/deckparse.js';
import { sampleWithData } from '../scripts/sample.js';
import { queryCards } from '../scripts/ygo/ygocard.js';
import CardDB from '../db/carddb.js';

// TODO: ERROR CHECKING AND DATA VALIDATION
// TODO: VALIDATION FOR MINIMUM 40 CARD DECK, MAXIMUM 60 CARD DECK
// TODO: LOADING YDK COMPATIBLE DECKLISTS FROM FILE, SCRUB EXTRA DECK AND HEADINGS
// TODO: ERROR HANDLING FOR FETCH WHEN NOT CONNECTED TO INTERNET

export const deckRouter = express.Router();
// We connect to the carddb whenever this route is mounted
// We then chain then() and catch() to load the card model to this db or log any errors
const cardDB = new CardDB();
cardDB
    .connect('mongodb://localhost/cards')
    .then(
        (db) => { db.loadCardModel() }
    )
    .catch(
        (err) => { console.log(err) }
    );

deckRouter.post('/create',(req,res) => {
    console.log('received deck list')
    // TODO: Error checking
    const deckName = req.body.deckName;
    const deckList = req.body.deckList;
    // We save the new deck inside our session object that persists
    req.session.deck = parseDeck(deckList);
    req.session.deckName = deckName;
    res.redirect(`/deck/${deckName}/decklist`);
});

deckRouter.get('/:deckName/samples', async (req,res) => {
    let hands = await sampleWithData(req.session.deck,cardDB);
    // hands is [ [{ name,data }] . . . [{ name,data }] ]
    res.render('deck/sample',{ hands: hands });
});

deckRouter.get('/:deckName/decklist',async (req,res) => {
    const deck = req.session.deck;
    const name = req.session.deckName;
    const decklist = await queryCards(deck,cardDB);
    res.render('deck/decklist',{ name: name,deck: decklist });
});