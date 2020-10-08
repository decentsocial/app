const express = require('express')
const router = express.Router()
const secured = require('./middlewares/secured')
const UserRepo = require('../UserRepo')

router.get('/info', secured, async function (req, res, next) {
  console.log('/info', req.user, req.isAuthenticated())
  console.log('sub', req.user.sub)
  const user = await UserRepo.findOne({ sub: req.user.sub })
  console.log('user', user)
  res.json(user)
})

module.exports = router
