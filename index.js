#!/usr/bin/env node
require('dotenv').config()

const HTTP_PORT = +(process.env.HTTP_PORT || 4000)
const createServer = require('./lib/server')

main(HTTP_PORT)
  .catch(err => {
    console.error('error, exiting', err)
    process.exit(1)
  })

async function main (HTTP_PORT) {
  if (!Number.isFinite(HTTP_PORT)) throw new Error('INVALID_HTTP_PORT')
  const server = await createServer()
  console.info('HTTP_PORT', HTTP_PORT)
  await server.listen(HTTP_PORT)
  console.info(`server listening on http://localhost:${HTTP_PORT}`)
}
