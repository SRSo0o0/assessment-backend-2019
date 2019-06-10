

const { gql } = require('apollo-server-express')

const Incident = gql`

enum IncidentStatusTypes {

  Created
  Acknowledged
  Resolved

}

input RaiseIncidentInputField {

  title: String!
  description: String!
     
}

input IncidentFilterfield {
  title: String
  description: String
  status: IncidentStatusTypes
  
}

input SortInputfield {
  field: String
  order: Int
}
input PageInputfield {
  pageNo: Int
}

type DeleteStatus {
	status: String
}

type UpdateStatus {
	nModified: Int
	ok: Int
}

type Incident {
  _id: String
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
  totalPageItems: Int
  pageNo: Int
}

extend type Query {

  listIncident(id: String!): Incident
  listIncidents(filter: IncidentFilterfield, sort:SortInputfield, pagination: PageInputfield):IncidentList  

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
