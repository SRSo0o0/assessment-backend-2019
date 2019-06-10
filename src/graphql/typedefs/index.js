

const rootType = require('./root')
const user = require('./User')
const incident = require('./Incident')

const typeDefs = [rootType, user, incident]

module.exports = typeDefs
