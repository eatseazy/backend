import models from '@models'

const {
  Restaurant,
  RestaurantFoodTag,
} = models

export const findRestaurantByUser = user => {
  return Restaurant.findOne({
    where: {
      UserId: user.id,
    },
    include: [
      {
        association: 'Owner',
      },
      {
        association: 'FoodTags',
        attributes: ['name'],
      },
    ],
  })
}

export const findRestaurantFoodTag = args => {
  return RestaurantFoodTag.findOne({ where: { ...args } })
}

export const addRestaurantFoodTag = (RestaurantId, FoodTagId) => {
  return RestaurantFoodTag.create({
    RestaurantId,
    FoodTagId,
  })
}

export const removeRestaurantFoodTag = (RestaurantId, FoodTagId) => {
  return RestaurantFoodTag.destroy({
    where: {
      RestaurantId,
      FoodTagId,
    }
  })
}
