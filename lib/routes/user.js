const express = require('express')
const router = express.Router()

router.get('/info', function (req, res, next) {
  console.log('/info', req.user)
  res.json(req.user)
})

module.exports = router
