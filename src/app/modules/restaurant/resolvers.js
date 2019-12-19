import models from '@models'

const {
  User,
  Restaurant,
} = models

export default {
  Query: {
    restaurants: async () => {
      return await Restaurant.findAll({
        include: [
          { model: User, as: 'Owner' }
        ]
      })
    },
    myRestaurant: async (...args) => {
      const [,, { loggedUser }] = args

      const user = await User.findOne({
        where: {
          email: loggedUser.email,
        },
        attributes: ['id'],
        raw: true,
      })

      const restaurant = await Restaurant.findOne({
        where: {
          UserId: user.id
        },
        include: [
          {
            model: User,
            as: 'Owner',
          },
        ],
        attributes: [
          'name',
          'phone',
          'description',
        ],
      })

      if (!restaurant) throw new Error('No restaurant found for current user')

      return restaurant
    }
  },

  Mutation: {
    createRestaurant: async (...args) => {
      const [, { input }, { loggedUser }] = args

      const user = await User.findOne({ where: { email: loggedUser.email } })
      const newRestaurant = await Restaurant.create({
        ...input,
        UserId: user.id,
      })

      return {
        ...newRestaurant.dataValues,
        Owner: { ...user.dataValues },
      }
    },
    updateRestaurant: async (...args) => {
      const [, { input }, { loggedUser }] = args

      const user = await User.findOne({
        where: { email: loggedUser.email },
        attributes: [
          'id',
          'email',
          'role',
          'status',
        ],
        raw: true,
      })

      const [, updatedRestaurants] = await Restaurant.update({
        ...input,
      },{
        where: { UserId: user.id },
        raw: true,
        returning: true,
      })

      return {
        ...updatedRestaurants[0],
        Owner: { ...user }
      }
    },
    deleteRestaurant: async (_, { id }) => {
      try {
        return await Restaurant.destroy({
          where: { id }
        })
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
