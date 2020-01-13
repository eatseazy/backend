import models from '@models'
import {
  findUser,
  findRestaurantFoodTag,
  findRestaurantByUser,
  findFoodTag,
  findFoodTags,
  addRestaurantFoodTag,
  removeRestaurantFoodTag,
} from '@services'

const {
  User,
  Restaurant,
} = models

export default {
  Query: {
    restaurants: () => {
      return Restaurant.findAll({
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
            association: 'Owner',
          },
          {
            association: 'FoodTags',
          },
        ],
        attributes: ['name','phone','description','address','city','zipCode'],
      })

      if (!restaurant) throw new Error('No restaurant found for current user')

      return restaurant
    },
    allFoodTags: () => {
      return findFoodTags()
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
    },
    addRestaurantFoodTag: async (...args) => {
      const [, { tag }, { loggedUser }] = args

      const user = await findUser({ email: loggedUser.email })

      if (!user) throw Error('Utilisateur inexistant')

      const restaurant = await findRestaurantByUser(user)
      const foodTag = await findFoodTag({ name: tag })

      const foodTagAlreadyAdded = await findRestaurantFoodTag({
        RestaurantId: restaurant.id,
        FoodTagId: foodTag.id,
      })

      if (foodTagAlreadyAdded) throw Error('Tag déjà ajouté')

      await addRestaurantFoodTag(restaurant.id, foodTag.id)

      return true
    },
    removeRestaurantFoodTag: async (_, { tag }, { loggedUser }) => {
      const user = await findUser({ email: loggedUser.email })

      if (!user) throw Error('Utilisateur inexistant')

      const restaurant = await findRestaurantByUser(user)
      const foodTag = await findFoodTag({ name: tag })

      if (await removeRestaurantFoodTag(restaurant.id, foodTag.id) <= 0) throw Error("Vous ne pouvez pas supprimer un tag qui n'a pas été sélectionner")

      return true
    },
  },
}
