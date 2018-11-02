'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"//test.mdguanjia.com/myhome/"',
  WEB_LINK: '"//www.52mailin.com/"'
})
