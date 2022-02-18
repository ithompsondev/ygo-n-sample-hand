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
    res.render('index')
})

app.listen(port,() => {
    console.log(`Server started on http://${host}:${port}`)
})