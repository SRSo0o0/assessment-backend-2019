

const { gql } = require('apollo-server-express')

const User = gql`

enum UserRoleTypes {

  Engineer
  Supervisor

}

input assigneeInputField {
  name: String!
  email: String!
}
input UpdateUserInputField {
  id: String!
  assignee: assigneeInputField!  
}

type User {
	name: String
	email: String
	role: String
}
`
module.exports = User;
