import models from "@models"
import { sendWelcomeEmail } from "lib/Mailjet"

const {
  Restaurant,
  User,
} = models

export default {
  Query: {
    users: () => {
      return User.findAll();
    }
  },
  Mutation: {
    login: async (_, { input }) => {
      const { email, password } = input

      const user = await User.findOne({ where: { email } })

      if (!user) throw new Error('Unknown user')
      if (!user.validPassword(password)) throw new Error('Incorrect credentials')

      return await user.createToken()
    },
    signup: async (_, { input }) => {
      const { role } = input

      const newUser = await User.create({ ...input })
      if (role === 'RESTAURANT') {
        await Restaurant.create({ UserId: newUser.id })
      }

      sendWelcomeEmail([{ 'Email': input.email } ])

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
    updateUser: (_, { input }) => {
      return User.findOneAndUpdate({ _id: id }, { ...input })
    },
    deleteUser: (_, { id }) => {
      return User.destroy({ where: { id } })
    }
  }
}
