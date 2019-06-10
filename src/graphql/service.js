
const { ApolloServer } = require('apollo-server-express')

const graphqlCompse = (typeDefs, resolvers, repo) => new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    repo,
  }),
  playground: {
    endpoint: 'http://localhost:3000/graphql',
    settings: {
      'editor.theme': 'light',
    },
  },
})

module.exports = Object.assign({}, { graphqlCompse })
