import {setup,useEJS,mountRouter,port,host,accessRequestBody,setSession} from './scripts/server.js'
import {deckRouter} from './routes/deck.js'
import dotenv from 'dotenv'
dotenv.config()

const app = setup()
useEJS(app)
setSession(app)
accessRequestBody(app)

mountRouter(app,'/deck',deckRouter)
app.get('/',(req,res) => {
    console.log(`Session ID: ${req.session.id}`)
    res.render('index')
})

app.listen(port,() => {
    console.log(`Server started on http://${host}:${port}`)
})