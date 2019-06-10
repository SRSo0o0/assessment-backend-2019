'use strict'

const express = require(`express`)
const graphQLSERVER = require('./graphql/schema.js')
const config = require('config')
const mongoose  = require('mongoose')
mongoose.Promise  = global.Promise

const { seedUsers } = require('./db-init')

mongoose.connect(config.get('db.uri'), { useNewUrlParser: true })
  .then(async () => {
    console.log('INFO: Connected to the database')

    await seedUsers()
    const app = express()
    graphQLSERVER.applyMiddleware({ app })
    const { host, port } = config.get('server')

    app.listen({ port }, () => {
      console.log(`Server ready at http://${ host }:${ port }${ graphQLSERVER.graphqlPath }`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(-1)
  })
