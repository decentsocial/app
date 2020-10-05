module.exports = function () {
  return function secured (req, res, next) {
    if (req.user) { return next() }
    if (req.originalUrl.includes('/api')) return res.status(403).end()
    return res.redirect('/')
    // req.session.returnTo = req.originalUrl
    // res.redirect('/login')
  }
}
