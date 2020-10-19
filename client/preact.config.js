module.exports = function (config, env) {
  if (process.env.NODE_ENV !== 'development') {
    config.devtool = false // disable sourcemaps
  }
}
