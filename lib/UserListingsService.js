const monk = require('monk')
const UserListingsRepo = require('./UserListingsRepo')
const TemplateService = require('./TemplateService')

module.exports = {
  create,
  list
}

async function create (userListing, user) {
  userListing.userId = monk.id(user._id)

  const errors = await validateUserListing(userListing, user)
  if (errors.length > 0) return [errors]

  const [templateErrors, compiledTemplate] = await TemplateService.compile(userListing.template, userListing)
  if (Array.isArray(templateErrors) && templateErrors.length > 0) return errors.concat(templateErrors)
  userListing.compiledTemplate = compiledTemplate

  return UserListingsRepo.insert(userListing)
    .then((doc) => {
      console.log('successfully created user listing', userListing)
      return [null, doc]
    })
    .catch(err => {
      if (err.toString().includes('E11000')) return [['Duplicate listing']]
      console.error('error while inserting userListing', userListing, err)
      return [[err.name]]
    })
}

async function list (user) {
  return UserListingsRepo.find({ userId: user._id })
    .then((docs) => {
      return [null, docs]
    })
    .catch(err => {
      console.error('error while retrieving userListing', err)
      return [[err.name]]
    })
}

function validateUserListing (userListing, user) {
  const allowedFields = ['title', 'userId', 'template', 'description', 'brand', 'compatibility', 'material', 'images', 'image1']
  const errors = []
  if (!userListing) errors.push('MISSING_USER_LISTING')
  else {
    if (Object.keys(userListing).filter(f => !allowedFields.includes(f)).length > 0) errors.push('UNSUPPORTED_USER_LISTING_FIELDS')
    if (!userListing.userId) errors.push('MISSING_USER_LISTING_USER_ID')
    if (!Number.isFinite(userListing.template)) errors.push('MISSING_USER_LISTING_TEMPLATE')
    if (typeof userListing.title !== 'string' || !userListing.title) errors.push('MISSING_USER_LISTING_TITLE')
    if (typeof userListing.description !== 'string' || !userListing.description) errors.push('MISSING_USER_LISTING_DESCRIPTION')
    if (typeof userListing.image1 === 'string' && !userListing.image1.startsWith('http')) errors.push('INVALID_USER_LISTING_IMAGE')
  }
  return Promise.resolve(errors)
}
