

const repo = require('../domain')
const TYPEDEFS = require('./typeDefs')
const RESOLVERS = require('./resolvers')
const { graphqlCompse } = require('./service')

const SERVER = graphqlCompse(TYPEDEFS, RESOLVERS, repo)
// Exports
module.exports = SERVER;
