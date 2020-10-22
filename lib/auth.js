require('dotenv').config()
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const UserRepo = require('./UserRepo')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = (server) => {
  const sessionConfig = {
    cookie: {
      secure: false
    },
    responseType: 'code',
    secret: process.env.AUTH0_SECRET || 'RandomSecureSecret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
      collection: 'sessions'
    })
  }
  if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true
  }
  server.use(session(sessionConfig))

  const options = {
    scope: 'openid email profile',
    // responseType: 'code',
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'https://decent.social/callback'
  }

  const strategy = new Auth0Strategy(options,
    function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
      return UserRepo.update({ email: profile.email }, { $set: profile._json }, { upsert: true, new: true })
        .then((doc) => {
          console.log('user created', doc)
          return done(null, profile)
        })
        .catch(err => done(err))
    })

  passport.use(strategy)
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  server.use(passport.initialize())
  server.use(passport.session())
}
