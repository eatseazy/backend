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
      try {
        const { email, password } = input

        const user = await User.findOne({ where:  { email } })

        if (!user) throw new Error('Unknown user')
        if (!user.validPassword(password)) throw new Error('Incorrect credentials')

        return await user.createToken()
      } catch (error) {
        console.log("[MODULES:USER][RESOLVERS:LOGIN] > ", error)
      }
    },
    signup: async (_, { input }) => {
      const { role } = input

      const newUser = await User.create({ ...input })
      if (role === 'RESTAURANT') {
        await Restaurant.create({ UserId: newUser.id })
      }

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
