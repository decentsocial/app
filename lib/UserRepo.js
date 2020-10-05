const db = require('./db')
const Users = db.get('users')

module.exports = {
  update: Users.update,
  findOne: Users.findOne
}
