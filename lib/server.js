require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')

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
  server.set('trust proxy', true)

  server.use('/api', apiRouter)
  server.use('/user', userRouter)

  server.use('/', express.static(path.resolve(__dirname, '..', 'client', 'build')))
  server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html')))

  return server
}
