const test = require('ava')
const got = require('got')
const createServer = require('./server')

test.skip('responds to ping', async t => {
  const instance = await createServer()
  await instance.listen(0)
  const response = await got(`http://localhost:${instance.address().port}/ping`)
  t.truthy(response)
  t.is(response.statusCode, 200)
  t.is(response.headers['content-type'], 'text/plain; charset=utf-8')
  t.is(response.body, 'pong')
})

test.skip('return main HTML page', async t => {
  const instance = await createServer()
  await instance.listen(0)
  const response = await instance.inject('/')
  t.truthy(response)
  t.is(response.statusCode, 200)
  t.is(response.headers['content-type'], 'text/html; charset=UTF-8')
})
