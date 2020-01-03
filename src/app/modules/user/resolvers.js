import crypto from 'crypto-random-string'
import {
  createUser,
  createPasswordResetToken,
  createVerificationToken,
  updateUser,
  findUser,
  findUsers,
  findPasswordResetToken,
} from '@services'

import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from 'lib/Mailjet'

export default {
  Query: {
    users: () => {
      return findUsers();
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await findUser({ email })

      if (!user) throw Error('Utilisateur inexistant')
      if (user.status === 'DISABLED') throw Error("Votre compte n'est pas activé")
      if (user.status === 'BLOCKED') throw Error('Votre compte a été bloqué')
      if (! await user.validPassword(password)) throw Error("La combinaison nom d'utilisateur/mot de passe fournie n'existe pas")

      return await user.createToken()
    },
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
      }

      return user.status === 'ENABLED'
    },
    createUser: async (_, { input }) => {
      const user = await createUser(input)
      const verificationToken = await createVerificationToken(user.id, crypto({ length: 16 }))

      sendVerificationEmail(user.email, verificationToken.token)

      return user
    },
    triggerPasswordReset: async (_, { email }) => {
      const user = await findUser({ email })

      if (!user) throw Error('Utilisateur inexistant')

      const passwordResetToken = await createPasswordResetToken(user.id, crypto({ length: 16 }))

      sendResetPasswordEmail(email, passwordResetToken.token)

      return true
    },
    resetPassword: async (_, { token, password }) => {
      const passwordResetToken = await findPasswordResetToken({ token })
      const user = await findUser({ id: passwordResetToken.UserId })

      await updateUser(user, { password })

      return true
    },
    updateUser: () => {
    },
    deleteUser: () => {
    },
  }
}
