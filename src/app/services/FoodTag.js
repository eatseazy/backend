import models from '@models'

const { FoodTag } = models

export const findFoodTag = async (where, options= { raw: false }) => {
  const foodTag = await FoodTag.findOne({ where, options })

  if (!foodTag) throw Error('Tag inexistant')

  return foodTag
}

export const findFoodTags = (options= { raw: true }) => {
  return FoodTag.findAll({
    attributes: ['name'],
    ...options,
  })
}
