'use strict'

const { gql } = require('apollo-server-express')

const User = gql`

enum UserRoleTypes {

  Engineer
  Supervisor

}

type User {
	name: String
	email: String
	role: String
}
`

module.exports = User;
