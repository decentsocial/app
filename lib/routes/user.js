const express = require('express')
const router = express.Router()
const secured = require('./middlewares/secured')

router.get('/info', secured, function (req, res, next) {
  console.log('/info', req.user)
  res.json(req.user)
})

module.exports = router
