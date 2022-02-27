import express from 'express';
import { normalize } from '../scripts/deckparse.js';
import { sampleWithData } from '../scripts/sample.js';
import { queryCards } from '../scripts/ygo/ygocard.js';
import CardDB from '../db/carddb.js';

// TODO: VALIDATION FOR MINIMUM 40 CARD DECK, MAXIMUM 60 CARD DECK
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
    console.log('received deck list');
    const deckName = req.body.deckName;
    const deckList = req.body.deckList;
    // We save the new deck inside our session object that persists, our session only saves now since
    // we update the session variables.
    req.session.deckList = deckList;
    req.session.normalizedDeckList = normalize(deckList);
    req.session.deckName = deckName;
    res.json({ status: 200, deckCreated: true });
});

deckRouter.get('/decklist',async (req,res) => {
    const deck = req.session.normalizedDeckList;
    const name = req.session.deckName;
    const decklist = await queryCards(deck,cardDB);
    //res.render('deck/decklist',{ name: name,deck: decklist });
    // RESPONDING TO FRONT END
    // res.json({ name: name,deck: decklist })
    res.json({ status: 200,deckName: name,deck: decklist.cards,errors: decklist.errors });
});

deckRouter.get('/:deckName/samples', async (req,res) => {
    let hands = await sampleWithData(req.session.deck,cardDB);
    // hands is [ [{ name,data }] . . . [{ name,data }] ]
    res.render('deck/sample',{ hands: hands });
    // RESPONDING TO FRONT END (LIKE AN API ENDPOINT)
    // res.json({ hands: hands })
});