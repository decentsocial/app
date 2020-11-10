require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const helmet = require('helmet')
const morgan = require('morgan')

const apiRouter = require('./routes/api')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const demoRouter = require('./routes/demo')
const paymentsRouter = require('./routes/payments')
const secured = require('./routes/middlewares/secured')
const auth = require('./auth')

module.exports = async () => {
  const server = express()
  server.set('trust proxy', true)
  // server.use(helmet())
  server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  server.use(cors({
    methods: ['*'],
    origin: '*',
    // origin: 'http://localhost:8080',
    // origin: true,
    credentials: true
  }))
  server.use(cookieParser())
  server.use(express.json())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  auth(server)

  server.use('/', authRouter)
  server.use(paymentsRouter)
  server.use('/demo', demoRouter)
  server.use('/api', secured, apiRouter)
  server.use('/user', secured, userRouter)

  server.use('/', express.static(path.resolve(__dirname, '..', 'client', 'build')))
  server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html')))

  return server
}
