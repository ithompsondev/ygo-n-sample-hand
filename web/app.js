import { setup,useEJS,mountRouter,port,host,accessRequestBody,initSessions,connectSessions } from './scripts/server.js';
import { deckRouter } from './routes/deck.js';
import dotenv from 'dotenv';
dotenv.config();

const sessionDB = connectSessions();
const app = setup();
useEJS(app);
initSessions(app);
accessRequestBody(app);

mountRouter(app,'/deck',deckRouter);
app.get('/',(req,res) => {
    res.render('index')
});

app.listen(port,() => {
    console.log(`Server started on http://${host}:${port}`)
});