const UserRepo = require('../UserRepo')
const SettingsRepo = require('../SettingsRepo')
const getFollowing = require('../get-following')

module.exports = async function updateUserSettings (user, newSettings) {
  if (!user) throw new Error('user not found')
  let settings = await SettingsRepo.findOne({ userId: user._id })
  if (!settings) {
    settings = await SettingsRepo.insert({ userId: user._id }, { new: true })
  }

  let needsUpdateFollowing = !Array.isArray(settings.following) || settings.following.length === 0

  if (newSettings.twitterHandle && settings.twitterHandle !== newSettings.twitterHandle) {
    needsUpdateFollowing = true
  }

  if (needsUpdateFollowing) {
    const following = await getFollowing(newSettings.twitterHandle)
    newSettings.following = following
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
