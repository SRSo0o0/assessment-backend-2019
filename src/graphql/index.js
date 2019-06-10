'use strict'

const { ApolloServer } = require('apollo-server-express')
const dbRepo = require('../domain')
const TYPEDEFS = require('./typeDefs')
const RESOLVERS = require('./resolvers')

const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  context: ({ req }) => ({
    req,
    dbRepo
  }),
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});
// Exports
module.exports = SERVER;
