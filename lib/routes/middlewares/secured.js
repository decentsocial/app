const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

module.exports = process.env.NODE_ENV !== 'test' ? jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://decentsocial.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.decent.social',
  issuer: 'https://decentsocial.eu.auth0.com/',
  algorithms: ['RS256']
}) : function secured (req, res, next) {
  if (req.user) { return next() }
  console.log('req.headers.authorization', req.headers.authorization)
  if (req.headers.authorization === 'test') { return next() }
  if (req.originalUrl.includes('/api')) return res.status(403).end()
  return res.sendStatus(403)
}
