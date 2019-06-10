'use strict'

const { User, Incident } = require('./models')
const handlers = require('./repository/handlers')

const dbService = handlers(Incident, User)

module.exports = dbService
