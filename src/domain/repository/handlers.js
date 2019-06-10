

const { ObjectId } = require('mongodb')

const handlers = (modelSchema, relationSchema) => {

  const convert = (o) => {

    if (o) {

      o.id = o._id.toString()
      o.createdAt = o.createdAt.toISOString()
      o.updatedAt = o.updatedAt.toISOString()

    }
    return Object.assign({}, o)

  }

  const raiseIncident = async (incidentObj) => {

    let newIncident = null
    const user = await relationSchema.findOne({ role: 'Engineer' }).lean()

    if (user) {

      newIncident = await new modelSchema({ ...incidentObj, assignee: user._id }).save()
      newIncident = newIncident.toObject()
      newIncident.assignee = user

    }
    return convert(newIncident)

  }

  const readIncidentDetail = async (incidentId) => {

  	const incident = await modelSchema.findOne({ _id: ObjectId(incidentId) }).lean()
    if (incident) {

      incident.assignee = await relationSchema.findOne({ _id: incident.assignee }).lean()

    }
    return convert(incident)

  }

  const readIncidents = async ({ filter = {}, sort = { createdAt: 1, updatedAt: 0 }, pagination = { pageNo: 1 } }) => {

    const incident = await modelSchema.find({}).sort({ _id: -1 }).skip((pageNo - 1) * 10).limit(10)
      .lean()
    const countTotal = await query.count()
    return { incidents, countTotal }

  }

  const updateIncident = async ({ id, update }) => await modelSchema.updateOne({ _id: ObjectId(id) }, update, { upsert: false }).exec()

  const deleteIncident = async id => await modelSchema.deleteOne({ _id: ObjectId(id) }).exec()

  return Object.create({
    raiseIncident,
    readIncidentDetail,
    updateIncident,
    deleteIncident,

  })

}

module.exports = handlers
