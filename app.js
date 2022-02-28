import {
    port,
    host, 
    setup,
    useEJS,
    useCORS,
    mountRouter,
    initSessions,
    connectSessions,
    accessRequestBody, 
} from './scripts/server.js';
import { deckRouter } from './routes/deck.js';
import express from 'express'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const sessionDB = connectSessions();
const app = setup();
useEJS(app);
useCORS(app);
initSessions(app);
accessRequestBody(app);

mountRouter(app,'/deck',deckRouter);
app.get('/',(req,res) => {
    let deckName = '';
    let deckList = 'Pot of Greed 3\nGraceful Charity 3\nChange of Heart 3';
    if (req.session.deckName) {
        deckName = req.session.deckName;
    }
    if (req.session.deckList) {
        deckList = req.session.deckList;
        deckList = deckList.reduce((deckListStr,card) => { return deckListStr + card + '\n'; },'');
    }
    res.json({ status: 200,deckName: deckName,deckList: deckList });
});

if (process.env.NODE_ENV === 'production') {
    console.log('attempting to server static files');
    const __dirname = path.resolve();
    app.use(express.static('sample-front/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'sample-front','build','index.html'));
    });
}

app.listen(port,() => {
    console.log(`Server started on http://${host}:${port}`)
});