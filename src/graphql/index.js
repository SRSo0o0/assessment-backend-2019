'use strict'

const { ApolloServer } = require('apollo-server-express')
const repo = require('../domain')
const TYPEDEFS = require('./typeDefs')
const RESOLVERS = require('./resolvers')

const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  context: ({ req }) => ({
    req,
    repo
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
