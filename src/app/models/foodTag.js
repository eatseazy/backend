module.exports = (sequelize, DataTypes) => {
  const FoodTags = sequelize.define('FoodTag', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  FoodTags.associate = models => {
    models.FoodTag.belongsToMany(models.Restaurant, {
      through: models.RestaurantFoodTag,
      unique: false,
    })
  }

  return FoodTags
}
