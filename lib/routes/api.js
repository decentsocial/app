const express = require('express')
const secured = require('./middlewares/secured')
const getFollowing = require('../get-following')
const router = express.Router()

router.get('/following', secured, async function (req, res, next) {
  const username = req.body.username
  if (!username) return []
  const following = await getFollowing(username)
  return res.json(following)
})

module.exports = router
