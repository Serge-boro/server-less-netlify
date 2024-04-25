require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./router/storeRouter')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const serverless = require('serverless-http')

const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

const app = express()

// app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.json())

const corsConfig = {
  origin: 'https://react-node-express-jwt-mongodb.netlify.app',
  credentials: true,
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use(cookieParser())

app.use('/.netlify/functions/app', router)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './build', 'index.html'))
// })

// const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://SerhiiBorodin:W05w0SOgG8J4P3QR@cluster0.qmn1t.mongodb.net/Comfy_Store_Full_Project',
      console.log('Connecting to mongoDB ...')
    )
    // await app.listen(PORT, console.log(`Listening ${PORT} port ...`))
  } catch (err) {
    console.log(err)
  }
}

console.log('test-netlify')

start()

module.exports.handler = serverless(app)
