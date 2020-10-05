require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')

var authRouter = require('./routes/auth')
var apiRouter = require('./routes/api')
var userRouter = require('./routes/user')
// var secured = require('./routes/middlewares/secured')
const auth = require('./auth')

module.exports = async () => {
  const server = express()
  server.use(helmet())
  server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

  auth(server)

  server.use(bodyParser.json())

  server.set('view engine', 'html')

  server.use('/api', apiRouter)
  process.env.AUTH_ENABLED === 'true' && server.use('/', authRouter)
  server.use('/user', userRouter)

  server.use('/assets', express.static(path.join(__dirname, 'client', 'assets')))
  server.get('/', (req, res) => res.render('index.html'))
  server.use('/', express.static(path.join(__dirname, 'client')))

  return server
}
