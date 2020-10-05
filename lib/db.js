const monk = require('monk')
require('dotenv').config()

module.exports = monk(`${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
