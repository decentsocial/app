const express = require('express')
const router = express.Router()
const UserRepo = require('../UserRepo')
const SettingsRepo = require('../SettingsRepo')

router.get('/settings', async function (req, res, next) {
  console.log('get settings', req.body)
  const user = await UserRepo.findOne({ sub: req.user.sub })
  const settings = await SettingsRepo.findOne({ userId: user._id })

  res.json(settings || {})
})
router.put('/settings', async function (req, res, next) {
  const newSettings = req.body

  console.log('put settings', newSettings)
  const allowedKeys = ['twitterHandle', 'following']
  const keys = Object.keys(newSettings)
  if (!keys.every(k => allowedKeys.includes(k))) return res.writeHead(400)

  const user = await UserRepo.findOne({ sub: req.user.sub })
  let settings = await SettingsRepo.findOne({ userId: user._id })
  if (!settings) {
    settings = await SettingsRepo.insert({ userId: user._id }, { new: true })
  }

  Object.assign(settings, newSettings)
  Object.assign(user, { setupComplete: true })

  await Promise.all([
    SettingsRepo.update({ _id: settings._id }, { $set: settings }),
    UserRepo.update({ _id: user._id }, { $set: user })
  ])
    .then(() => {
      console.log('successfully updated user settings', user, settings)
    })

  res.json(settings)
})

router.get('/info', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  const settings = await SettingsRepo.findOne({ userId: user._id })
  user.settings = settings || {}

  res.json(user)
})

module.exports = router
