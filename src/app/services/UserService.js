import models from '@models'

const {
  User,
  Restaurant,
  VerificationToken,
} = models

export const findUser = async args => User.findOne({ where: { ...args } })

export const findUsers = (args = {}) => {
  return User.findAll({ where: { ...args } })
}

export const createUser = async ({ email, password, role }) => {
  const user = await User.create({
    email,
    password,
    role,
    status: 'ENABLED',
  })

  if (role === 'RESTAURANT') await Restaurant.create({ UserId: user.id })

  return user
}

export const updateUser = (user, payload) => {
  return user.update({ ...payload })
}

export const createUserVerificationToken = (UserId, token) => {
  return VerificationToken.create({
    UserId,
    token,
  })
}
