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
    secret: 'RandomSecureSecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
      collection: 'sessions'
    })
  }
  server.use(session(sessionConfig))

  const options = {
    scope: 'openid email profile',
    responseType: 'code',
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'https://decent.social/callback'
  }

  console.log('options', options)

  const strategy = new Auth0Strategy(options,
    function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
      console.log('accessToken, refreshToken, extraParams, profile', accessToken, refreshToken, extraParams, profile)
      return UserRepo.update({ email: profile.email }, { $set: profile._json }, { upsert: true, new: true })
        .then((doc) => {
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
  // passport.serializeUser(function (user, done) {
  //   // console.log('serializeUser', user._json)
  //   done(null, user._json)
  // })

  // passport.deserializeUser(function (user, done) {
  //   // console.log('deserializeUser', user)
  //   UserRepo.findOne({ email: user.email })
  //     .then((user) => done(null, user))
  //     .catch(err => done(err))
  // })

  server.use(passport.initialize())
  server.use(passport.session())
}
