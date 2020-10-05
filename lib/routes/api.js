const express = require('express')
// const secured = require('./middlewares/secured')
// const UserListingsService = require('../UserListingsService')
const router = express.Router()

// router.get('/listing', secured(), async function (req, res, next) {
//   const [errors, userListings] = await UserListingsService.list(req.user)
//   if (Array.isArray(errors) && errors.length > 0) {
//     console.error('errors getting user listings', userListings, errors)
//     return res.status(503).send(JSON.stringify(errors))
//   }
//   return res.json(userListings)
// })

module.exports = router
