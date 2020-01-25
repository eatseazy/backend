import {
  findUser,
} from '@modules/user/services'

import {
  findRestaurantByUser,
} from '@modules/restaurant/services'

import {
  findFoodItem,
  findMyMenus,
  createFoodItem,
  createRestaurantMenu,
} from '@modules/menu/services'

export default {
  Query: {
    myMenus: async (_, {}, { loggedUser }) => {
      const user = await findUser({ email: loggedUser.email })
      const restaurant = await findRestaurantByUser(user)

      return findMyMenus(restaurant.id)
    },
  },
  Mutation: {
    createMenu: async (_, { input }, { loggedUser }) => {
      const user = await findUser({ email: loggedUser.email })
      const restaurant = await findRestaurantByUser(user)

      return await createRestaurantMenu({
        ...input,
        RestaurantId: restaurant.id,
      })
    },
    createFoodItem: (_, { input }) => {
      return createFoodItem(input)
    },
    deleteFoodItem: async (_, { id }) => {
      const foodItem = await findFoodItem({ id })
      await foodItem.destroy()

      return true
    },
  },
}
