import express from 'express'
import { config } from 'dotenv'
import connectDB from './db/index.js'
import router from './routes/index.js'

const app = express()

config()


app.use(express.json())
app.use(router)



app.listen(process.env.PORT, () => {
    connectDB().then(() => {
        console.log("Server running on 8080")
   })
})

