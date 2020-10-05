const db = require('./db')
const UserListings = db.get('userListings')

UserListings.createIndex({
  userId: 1,
  title: 1,
  template: 1
}, { unique: true })

module.exports = {
  insert: UserListings.insert,
  find: UserListings.find
}
