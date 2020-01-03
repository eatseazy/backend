import models from '@models'

const { PasswordResetToken } = models

export const findPasswordResetToken = args => {
  return PasswordResetToken.findOne({ where: { ...args } })
}

export const createPasswordResetToken = (UserId, token) => {
  const now = new Date()

  return PasswordResetToken.create({
    UserId,
    token,
    expires: new Date(now.getTime() + 30).toISOString(),
  })
}

export const deletePasswordResetToken = async (UserId, token) => {
  const passwordResetToken = findPasswordResetToken({ UserId, token })

  await passwordResetToken.delete()
}
