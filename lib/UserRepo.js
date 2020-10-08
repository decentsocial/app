const db = require('./db')
const users = db.get('users')

module.exports = users
// {
//   update: users.update,
//   findOne: users.findOne
// }
