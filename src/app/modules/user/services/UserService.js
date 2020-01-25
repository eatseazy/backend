import models from '@models'

const {
  Restaurant,
  User,
} = models

export const findUser = async args => User.findOne({ where: { ...args } })

export const findUsers = async (args = {}) => User.findAll({ where: { ...args } })

export const createUser = async ({ email, password, role }) => {
  const user = await User.create({
    email,
    password,
    role,
    status: 'ENABLED',
  })

  if (role === 'RESTAURANT') await Restaurant.create({ UserId: user.id })

  return user;
}

export const updateUser = (user, payload) => user.update({ ...payload })


