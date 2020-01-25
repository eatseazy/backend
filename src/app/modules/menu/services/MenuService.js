import models from '@models'

const {
  RestaurantMenu,
} = models

export const findMyMenus = RestaurantId => {
  return RestaurantMenu.findAll({ where: {
      RestaurantId,
    }})
}

export const createRestaurantMenu = ({ name, RestaurantId }) => {
  return RestaurantMenu.create({
    name,
    RestaurantId
  })
}
