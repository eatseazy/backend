import models from '@models'
import crypto from 'crypto-random-string'
import { sendVerificationEmail } from 'lib/Mailjet'

const {
  Restaurant,
  User,
  VerificationToken,
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

      const user = await User.findOne({
        where: {email},
      })

      if (!user) throw new Error('Unknown user')
      if (user.status !== 'ENABLED') throw Error('User not enabled')
      if (!user.validPassword(password)) throw new Error('Incorrect credentials')

      return await user.createToken()
    },
    signup: async (_, { input }) => {
      const { role } = input

      const user = await User.create({
        ...input,
        'status': 'DISABLED',
      })
      const verificationToken = await VerificationToken.create({
        UserId: user.id,
        token: crypto({length: 16}),
      })

      if (role === 'RESTAURANT') {
        await Restaurant.create({
          UserId: user.id
        })
      }

      sendVerificationEmail(user.email, verificationToken.token)

      return newUser.createToken()
    },
    activate: async (_, { email, token }) => {
      const user = await User.findOne({ where: { email }})

      if (!user) throw Error('Aucun utilisateur trouvé')
      if (user.status !== 'DISABLED') throw Error('Votre compte est déjà activé')

      const verificationToken = await VerificationToken.findOne({ where: { token }})
      if (verificationToken) {
        user.update({ status: (token === verificationToken.token) ? 'ENABLED':'DISABLED' })
      }

      return user.status === 'ENABLED'
    },
    createUser: async (_, { input }) => {
      const { role } = input

      const user = await User.create({
        ...input,
        'status': 'DISABLED',
      })
      const verificationToken = await VerificationToken.create({
        UserId: user.id,
        token: crypto({length: 16}),
      })

      if (role === 'RESTAURANT') {
        await Restaurant.create({
          UserId: user.id
        })
      }

      console.log(verificationToken.token)

      sendVerificationEmail(user.email, verificationToken.token)

      return user
    },
    updateUser: (_, { input }) => {
      return User.findOneAndUpdate({ _id: id }, { ...input })
    },
    deleteUser: (_, { id }) => {
      return User.destroy({ where: { id } })
    },
  }
}
