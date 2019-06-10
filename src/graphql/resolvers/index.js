

const { UserInputError } = require('apollo-server-express');

const errorResp = (err) => {

  throw new UserInputError(
    err.message,
  	{ type: err.name, msg: err.message },
  );

}


const RESOLVERS = {
  Query: {

    listIncident: async (_, { id }, { req, repo }) => {

      try {

      	return await repo.readIncidentDetail(id)

      } catch (err) {

      	errorResp(err)

      }

    },
    listIncidents: async (_, { filter, sort, pagination }, { req, repo }) => {

      try {

      	return await repo.readIncidents({
          filter: filter || undefined,
          sort: sort || undefined,
          pagination: pagination || undefined,
        })

      } catch (err) {

      	errorResp(err)

      }

    },


  },

  Mutation: {
    raise: async (_, { data }, { req, repo }) => {

      try {

      	data.status = 'Created'
        return await repo.raiseIncident(data)

      } catch (err) {

        errorResp(err);

      }

    },
    assign: async (_, { data: { id, assignee } }, { req, repo }) => {

      let errMsg
      try {

        return await repo.updateIncident({
        	id,
        	update: { assignee },
        })

      } catch (err) {

        errorResp(err);

      }


    },

    acknowledge: async (_, { id }, { req, repo }) => {

      try {

        return await repo.updateIncident({
        	id,
        	update: { status: 'Acknowledged' },
        })

      } catch (err) {

        errorResp(err);

      }

    },
    resolve: async (_, { id }, { req, repo }) => {

      try {

        return await repo.updateIncident({
        	id,
        	update: { status: 'Resolved' },
        })

      } catch (err) {

        errorResp(err);

      }

    },

    delete: async (_, { id }, { req, repo }) => {

      try {

        const { deleteCount } = await repo.deleteIncident(id)
        return (deleteCount === 1) ? { status: ok } : { status: reject }

      } catch (err) {

        errorResp(err);

      }

    },


  },

  Incident: {

  },


}

module.exports = RESOLVERS
