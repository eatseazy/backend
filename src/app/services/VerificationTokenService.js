import models from '@models'

const { VerificationToken } = models

export const findVerificationToken = args => {
  return VerificationToken.findOne({ where: { ...args } })
}

export const createVerificationToken = (UserId, token) => {
  const now = new Date()

  return VerificationToken.create({
    UserId,
    token,
    expires: new Date(now.getTime() + 30).toISOString(),
  })
}

export const deleteVerificationToken = async (UserId, token) => {
  const verificationToken = findVerificationToken({ UserId, token })

  await verificationToken.delete()
}
