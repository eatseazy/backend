/*import { Menu, Restaurant } from '../../../database/models'

export default {
  Mutation: {
    createMenu: async (...args) => {
      const [, { input }, { loggedUser }] = args

      if (!loggedUser) throw new Error('You are not authenticated !')

      const restaurant = await Restaurant.findOne({ _id: input.restaurant })
      if (!restaurant) throw new Error('An error has occured, Restaurant does not exist !')

      const newMenu = await Menu.create({ ...input })

      restaurant.menus.push(newMenu._id)
      await restaurant.save()

      return newMenu.populate('restaurant').execPopulate()
    }
  }
}*/
