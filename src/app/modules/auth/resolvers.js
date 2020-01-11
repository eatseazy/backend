import crypto from "crypto-random-string"
import {
  findUser,
  findPasswordResetToken,
  updateUser,
  createUser,
  createVerificationToken,
  createPasswordResetToken,
} from '@services'

import {
  sendResetPasswordEmail,
  sendResetPasswordEmailConfirmation,
  sendVerificationEmail,
} from "lib/Mailjet"

export default {
  Query: {
    me: (root, args, { loggedUser }) => loggedUser
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await findUser({ email })

      if (user.status === 'DISABLED') throw Error("Votre compte n'est pas activé")
      if (user.status === 'BLOCKED') throw Error('Votre compte a été bloqué')
      if (!await user.validPassword(password)) throw Error("La combinaison nom d'utilisateur/mot de passe fournie n'existe pas")

      return await user.createToken()
    },
    register: async (_, { input }) => {
      if (await findUser({ email: input.email })) throw Error('Ce courriel existe déjà')

      const user = await createUser(input)
      const verificationToken = await createVerificationToken(user.id, crypto({ length: 16 }))

      return await sendVerificationEmail(user.email, verificationToken.token)
    },
    triggerPasswordReset: async (_, { email }) => {
        const user = await findUser({ email })
        const passwordResetToken = await createPasswordResetToken(user.id, crypto({ length: 16 }))

        return await sendResetPasswordEmail(email, passwordResetToken.token)
    },
    resetPassword: async (_, { token, password }) => {
      const passwordResetToken = await findPasswordResetToken({ token })
      if (!passwordResetToken) return false

      const user = await findUser({ id: passwordResetToken.UserId })
      await updateUser(user, { password })

      return await sendResetPasswordEmailConfirmation(user.email);
    },
  },
}
