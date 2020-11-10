const db = require('./db')
const userCheckout = db.get('userCheckout')

module.exports = userCheckout
// {
//   update: userCheckout.update,
//   findOne: userCheckout.findOne
// }
