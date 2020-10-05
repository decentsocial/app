const dotenv = require('dotenv')
dotenv.config()
const { auth } = require('express-openid-connect')

module.exports = (server) => {
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'LtQcR4ReApkJsMgLkuwX3Q7ciAzahUwk',
    issuerBaseURL: 'https://decentsocial.eu.auth0.com'
  }

  // auth router attaches /login, /logout, and /callback routes to the baseURL
  server.use(auth(config))

  // req.isAuthenticated is provided from the auth router
  server.get('/', (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
    res.send(JSON.stringify(req.oidc.user, null, 2))
  })
}
