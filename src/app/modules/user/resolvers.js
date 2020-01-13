import {
  updateUser,
  findUser,
  findUsers,
} from '@services'

import { sendActivationEmailConfirmation } from 'lib/Mailjet'

export default {
  Query: {
    users: () => {
      return findUsers();
    }
  },
  Mutation: {
    activate: async (_, { email, token }) => {
      const user = await findUser({ email })

      if (!user) throw Error('Utilisateur inexistant')
      if (user.status === 'ENABLED') throw Error('Votre compte est déjà activé')
      if (user.status === 'BLOCKED') throw Error('Votre compte a été bloqué')

      const verificationToken = await findVerificationToken({
        token,
        UserId: user.id,
      })

      if (verificationToken && token === verificationToken.token) {
        await updateUser({status: 'ENABLED'})
        await sendActivationEmailConfirmation(user.email, user.role)
      }

      return user.status === 'ENABLED'
    },
    updateUser: () => {
    },
    deleteUser: async (_, { id }) => {
      const user = await findUser({ id })
      if (!user) throw Error('Utilisateur inexistant')

      await user.destroy()

      return true
    },
  }
}
