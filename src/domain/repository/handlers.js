

const { ObjectId } = require('mongodb')

const handlers = (modelSchema, relationSchema) => {

  const convert = (o) => {

    let newO = null
    if (o) {

      newO = Object.assign({}, o, { createdAt: o.createdAt.toISOString(), updatedAt: o.updatedAt.toISOString() })


    }
    return newO

  }

  const asyncForEach = async (array) => {

    const resAll = []
    let res
    for (let index = 0; index < array.length; index++) {

      try {

        res = await relationSchema.findOne({ _id: array[index].assignee });
        if (!res) {

          res = { name: null, email: null, role: null }

        }

      } catch (err) {

      }
      const Obj = Object.assign({}, { ...array[index]._doc }, { assignee: res })
      resAll.push(Obj)

    }
    return resAll

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

  const readIncidents = async ({ filter = {}, sort = { field: 'createdAt', order: -1 }, pagination = { pageNo: 1 } }) => {

    let incidents = await modelSchema.find(filter).sort({ [`${sort.field}`]: sort.order })
      .skip((pagination.pageNo - 1) * 10).limit(10)
    const totalCount = await modelSchema.countDocuments()
    if (totalCount) {

      incidents = await asyncForEach(incidents)
      incidents.map(item => (convert(item)))

    }

    return {
      incidents, totalCount, totalPageItems: 10, pageNo: pagination.pageNo,
    }

  }

  const assignUser = async ({ id, update }) => {

    const ok = 1
    const nModified = 1
    const { assignee } = update
    const query = Object.assign({}, assignee, { role: 'Engineer' })
    const userExists = await relationSchema.findOne(assignee).exec()
    if (userExists) {

      const updateData = { assignee: userExists._id.toString() }
      const updated = await modelSchema.findOneAndUpdate({ _id: ObjectId(id), status: 'Created' }, { $set: updateData }, { upsert: false }).exec()
      if (updated) {

        return { nModified, ok }

      }
      throw new Error('Incident Constrains mismatch')

    } else {

      throw new Error('Incident can only be assigned to an Engineer')

    }

  }

  const updateIncident = async ({ id, update }) => (('assignee' in update) ? await assignUser({ id, update }) : await modelSchema.updateOne({ _id: ObjectId(id) }, update, { upsert: false }).exec())

  const deleteIncident = async id => await modelSchema.deleteOne({ _id: ObjectId(id) }).exec()

  return Object.create({
    raiseIncident,
    readIncidentDetail,
    readIncidents,
    updateIncident,
    deleteIncident,

  })

}

module.exports = handlers
