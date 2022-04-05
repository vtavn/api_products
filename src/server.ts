import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

//databse
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
  autoIndex: false,
}, (err) => {
  if (err) throw err
  console.log('Mongodb connected.')
})

app.get('/', (req, res) => {
  res.json({msg: 'Hello world!' })
})


const PORT = process.env.PORT || 2829
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`server is running at ${HOST}:${PORT}`)
})