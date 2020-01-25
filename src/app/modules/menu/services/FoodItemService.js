import models from '@models'

const {
  FoodItem,
} = models

export const findFoodItem = async args => {
  const foodItem = await FoodItem.findOne({ where: { ...args } })

  if (!foodItem) throw Error('Item inexistant')

  return foodItem
}

export const createFoodItem = async ({ categorie, name, priceHT, priceTTC }) => {
  return FoodItem.create({
    categorie,
    name,
    priceHT,
    priceTTC,
  })
}
