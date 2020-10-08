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
router.get('/info', async function (req, res, next) {
  const user = await UserRepo.findOne({ sub: req.user.sub })
  const settings = await SettingsRepo.findOne({ userId: user._id })
  user.settings = settings || {}

  res.json(user)
})

module.exports = router
