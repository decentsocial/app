const express = require('express')
const router = express.Router()
const secured = require('./middlewares/secured')

router.get('/info', secured(), function (req, res, next) {
  res.json(req.user)
})

module.exports = router
