const express = require('express')
const router = express.Router()
const UserRepo = require('../UserRepo')
const SettingsRepo = require('../SettingsRepo')
const updateUserSettings = require('../actions/update-user-settings')
const validateUserSettings = require('../validations/validate-user-settings')
const decent = require('decent-social-cli')

router.get('/timeline', async function (req, res, next) {
  res.setTimeout(0)
  console.log('get timeline', req.body, req.query,req.user)
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) {
    console.error('no user', req.user)
    return res.writeHead(401)
  }
  const settings = await SettingsRepo.findOne({ userId: user._id })
  if (!settings) {
    console.error('no settings', user)
    return res.status(403).json([])
  }
  if (!Array.isArray(settings.following) || settings.following.length === 0) {
    console.error('no following', settings, user)
    return res.status(403).json([])
  }
  const { twitterHandle } = settings
  const following = settings.following
  console.log('loading timeline for', twitterHandle, following.length)
  let list = await decent.list({ usernames: following, max: +process.env.LIMIT || 1000 })
  if (Number.isFinite(+new Date(+req.query.since))) {
    console.log('filtering by since', new Date(+req.query.since), +req.query.since)
    list = list.filter(t => +new Date(t.date) > +new Date(+req.query.since))
  }
  list = list.map(t => ({
    ...t,
    status: '/status' + t.link.replace(/.*\/status/, '').replace(/#.*/, ''),
    html: t.html.replace(/max-width:250px;/gi, 'max-width:100%;').replace(/https:\/\/nitter\.net/gi, 'https://nitter.decent.social'),
    authorAvatar: t.authorAvatar.replace('https://nitter.net', 'https://nitter.decent.social')
  }))
  console.log('loaded timeline for', twitterHandle, following.length, list.length)
  return res.json(list)
})
router.get('/settings', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)
  console.log('get settings', user.nickname, req.body)

  const settings = await SettingsRepo.findOne({ userId: user._id })

  res.json(settings || {})
})
router.put('/settings', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)
  console.log('update user settings', user.nickname)

  const newSettings = req.body
  if (!validateUserSettings(newSettings)) return res.writeHead(400)

  const settings = await updateUserSettings(user, newSettings)
  res.json(settings)
})

router.get('/info', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)
  console.log('get user info', user.nickname)
  const settings = await SettingsRepo.findOne({ userId: user._id })
  user.settings = settings || {}

  res.json(user)
})

module.exports = router
