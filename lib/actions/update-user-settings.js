const UserRepo = require('../UserRepo')
const SettingsRepo = require('../SettingsRepo')

module.exports = async function updateUserSettings (user, newSettings) {
  if (!user) throw new Error('user not found')
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

  return settings
}
