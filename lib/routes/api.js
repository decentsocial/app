const express = require('express')
const getFollowing = require('../get-following')
const router = express.Router()

router.get('/following/:username', async function (req, res, next) {
  const username = req.params.username
  if (!username) return []
  const following = await getFollowing(username)
  return res.json(following)
})

module.exports = router
