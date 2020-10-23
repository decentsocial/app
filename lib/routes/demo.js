const express = require('express')
const router = express.Router()
const decent = require('decent-social-cli')
const getFollowing = require('../get-following')

router.get('/timeline', async function (req, res, next) {
  res.setTimeout(0)
  const { username } = req.query
  const following = await getFollowing(username, 20)
  let list = await decent.list({ usernames: following, max: +process.env.LIMIT || 1000 })
  list = list
    .filter(t => {
      return t.text && (!t.text.startsWith('R to') || !t.text.startsWith('RT by'))
    })
    .map(t => ({
      ...t,
      status: '/status' + t.link.replace(/.*\/status/, '').replace(/#.*/, ''),
      html: t.html.replace(/max-width:250px;/gi, 'max-width:100%;').replace(/https:\/\/nitter\.net/gi, 'https://nitter.decent.social'),
      authorAvatar: t.authorAvatar.replace('https://nitter.net', 'https://nitter.decent.social')
    }))
  return res.json(list)
})

module.exports = router
