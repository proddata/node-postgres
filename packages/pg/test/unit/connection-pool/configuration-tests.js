'use strict'

const assert = require('assert')
const helper = require('../test-helper')
const suite = new helper.Suite()

suite.test('pool with copied settings includes password', () => {
  const original = new helper.pg.Pool({
    password: 'original',
  })

  const copy = new helper.pg.Pool(original.options)

  assert.equal(copy.options.password, 'original')
})

suite.test('pool with copied settings includes OAuth bearer token', () => {
  const original = new helper.pg.Pool({
    oauthBearerToken: 'original',
  })

  const copy = new helper.pg.Pool(original.options)

  assert.equal(copy.options.oauthBearerToken, 'original')
})

suite.test('pool with a connection string passes the OAuth bearer token to its clients', () => {
  const pool = new helper.pg.Pool({
    connectionString: 'postgres://user@localhost/db',
    oauthBearerToken: 'token',
  })

  const client = new helper.pg.Client(pool.options)

  assert.equal(client.connectionParameters.oauthBearerToken, 'token')
  assert.equal(client.oauthBearerToken, 'token')
})
