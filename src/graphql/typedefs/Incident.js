'use strict'

const { gql } = require('apollo-server-express')

const Incident = gql`

enum IncidentStatusTypes {

  Created
  Acknowledged
  Resolved

}

input FilterfieldStringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String

}

input RaiseIncidentInputField {

  title: String!
  description: String!
     
}

input UpdateUserInputField {
  _id: String!
  assignee: String!  
}

input IncidentFilterfield {
  title: FilterfieldStringInput
  description: FilterfieldStringInput
  assignee: FilterfieldStringInput
  status: FilterfieldStringInput
  createdAt: FilterfieldStringInput
  updatedAt: FilterfieldStringInput
}

enum UserRoleTypes {

  Engineer
  Supervisor

}

type DeleteStatus {
	status: String
}

type UpdateStatus {
	nModified: Int
	ok: Int
}

type User {
	name: String
	email: String
	role: String
}

type Incident {
  id: String
  title: String
  description: String
  assignee: User
  status: IncidentStatusTypes
  createdAt: String
  updatedAt: String
}

type IncidentList {
	incidents:[Incident]
	totalCount: Int
}

extend type Query {

  listIncident(id: String!): Incident
  listIncidents(filter: IncidentFilterfield, first:Int, offset:Int):IncidentList  

}

extend type Mutation {
  raise(data: RaiseIncidentInputField!):Incident
  assign(data: UpdateUserInputField!):UpdateStatus
  acknowledge(id: String!):UpdateStatus
  resolve(id: String!):UpdateStatus
  delete(id: String!):DeleteStatus

}
`
module.exports = Incident;
