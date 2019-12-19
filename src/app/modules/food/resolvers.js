import { Food } from '../../../database/models'

export default {
  Query: {
    foods: async (...args) => {
      return "ok"
    }
  },
  Mutation: {
    createFood: async (...args) => {
      const [, { input }, { loggedUser }] = args

      if(!loggedUser) throw new Error('You are not authenticated')

      return await Food.create({ ...input })
    },
    updateFood: async (...args) => {
      const [, { id, input }, { loggedUser }] = args

      if(!loggedUser) throw new Error('You are not authenticated')

      return await Food.findOneAndUpdate({ _id: id }, { ...input })
    },
    deleteFood: async (...args) => {
      const [, { id }, { loggedUser }] = args

      if(!loggedUser) throw new Error('You are not authenticated')

      const { deletedCount } = await Food.deleteOne({ _id: id })
      return deletedCount > 0
    }
  }
}
