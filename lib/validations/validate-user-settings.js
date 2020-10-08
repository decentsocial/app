module.exports = function validateUserSettings (settings = {}) {
  const allowedKeys = ['twitterHandle', 'following']
  const keys = Object.keys(settings)
  if (!keys.every(k => allowedKeys.includes(k))) return false
  return true
}
