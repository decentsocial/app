const express = require('express')
const router = express.Router()
const UserRepo = require('../UserRepo')
const SettingsRepo = require('../SettingsRepo')
const updateUserSettings = require('../actions/update-user-settings')
const validateUserSettings = require('../validations/validate-user-settings')
const getFollowing = require('../get-following')
const decent = require('decent-social-cli')

router.get('/timeline', async function (req, res, next) {
  console.log('get timeline', req.body)
  const user = await UserRepo.findOne({ sub: req.user.sub })
  console.log('timeline', { user })
  if (!user) return res.writeHead(403)
  const settings = await SettingsRepo.findOne({ userId: user._id })
  if (!settings || !settings.twitterHandle) return res.writeHead(403)
  const { twitterHandle } = settings
  console.log('timeline', twitterHandle)
  const following = await getFollowing(twitterHandle)
  console.log('timeline', twitterHandle, following.length)
  const list = await decent.list({ usernames: following, max: 500 })
  console.log('timeline', twitterHandle, following.length, list.length)
  return res.json(list)
})
router.get('/settings', async function (req, res, next) {
  console.log('get settings', req.body)
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)
  const settings = await SettingsRepo.findOne({ userId: user._id })

  res.json(settings || {})
})
router.put('/settings', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)

  const newSettings = req.body
  if (!validateUserSettings(newSettings)) return res.writeHead(400)

  const settings = await updateUserSettings(user, newSettings)
  res.json(settings)
})

router.get('/info', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  if (!user) return res.writeHead(403)
  const settings = await SettingsRepo.findOne({ userId: user._id })
  user.settings = settings || {}

  res.json(user)
})

module.exports = router
