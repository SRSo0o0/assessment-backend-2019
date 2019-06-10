# Incident Management Microservice(GraphQL)

This repository contains code for Incident Management Microservice.
The server uses `Express` and `apollo-server-express` to expose a GraphQL interface. `MongoDB` is used as a database with `mongoose` as ODM.

## Service Domain

The Service handles Incident entity and following interactions:
- Create an incident 
- Update an incident
- list incident details
- delete an incident
- list all incidents

The service also handles incident entity relationship with user entity. The relationship is called assignee. The relationship has following constraints:

- On incident creation, a random user with Engineer role is set as assignee by the service. This is automatic and no input is expected from client.
- Only User with a role of Engineer can be assigned an incident.
- Incident can be reassigned to another user. This will only work provided the incident status is Created. For example, if first assignee is not available or off duty, incident can be reassigned to another user.


## QraphQL

The service exposes a GraphQL interface with the following features:

- Raise (create) an incident and assign it to a user with an `Engineer` role
- Assign the incident to a user
- Acknowledge the incident
- Resolve the incident
- Read details about a certain incident
- Delete an incident
- Index all incidents in the system
  - This includes filtering by fields, sorting by the date of creation and update and pagination
  
GraphQL `TypeDefs` and `Resolvers` are defined in grqphql dir and used to composition graphql service. We also inject a db service in the composition to enable the GraphQL interaction with data source, which is a mongodb. 

## MongoDB

Domain dir contains mongo models and corresponding handlers. Both are used to compose a dbservice. 

## Setup

Make sure you have Docker installed.
 - clone the git repo.
 - cd into the cloned dir.
 - run `docker-compose up -d`.
 - Open a browser and go to http://localhost/graphql. This will open up a graphql query interface with all the necessary information.
 - One can also use POSTMAN to interact with the service. 
 
