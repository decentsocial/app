require('dotenv').config()
var express = require('express')
var router = express.Router()
var passport = require('passport')
var util = require('util')
var url = require('url')

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/')
})

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    console.log('passport authenticate', user, info)
    if (err) return next(err)
    if (!user) return res.redirect('/login')
    req.logIn(user, function (err) {
      console.log('user login', err)
      if (err) return next(err)
      res.redirect('/')
    })
  })(req, res, next)
})

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout()

  var logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  )

  res.redirect(logoutURL)
})

module.exports = router
