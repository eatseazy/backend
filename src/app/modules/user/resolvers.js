//import { User } from '../../../database/models'
import models from '@models'

const {
  Restaurant,
  User,
} = models

export default {
  Query: {
    users: async () => {
      return await User.findAll()
    }
  },
  Mutation: {
    login: async (_, { input }) => {
      const { email, password } = input
      const user = await User.findOne({ email })

      if (!user) throw new Error('Unknown user')
      if (!user.validPassword(password)) throw new Error('Incorrect credentials')

      return await user.createToken()
    },
    signup: async (_, { input }) => {
      const newUser = await User.create({ ...input })

      return newUser.createToken()
    },
    createUser: async (_, { input }) => {
      const { role } = input

      const user = await User.create({ ...input })

      if (role === 'RESTAURANT') {
        await Restaurant.create({
          UserId: user.id
        })
      }

      return user
    },
    updateUser: async (_, { input }) => {
      return await User.findOneAndUpdate({ _id: id }, { ...input })
    },
    deleteUser: async (_, { id }) => {
      return await User.destroy({ where: { id } })
    }
  }
}
