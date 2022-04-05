import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

//database
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
  autoIndex: false,
}, (err) => {
  if (err) throw err
  console.log('Mongodb connected.')
})

// Routes
app.use('/api', routes)


const PORT = process.env.PORT || 2829
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`server is running at ${HOST}:${PORT}`)
})