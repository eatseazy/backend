module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
  })

  Restaurant.associate = models => {
    models.Restaurant.hasMany(models.RestaurantMenu, {
      as: 'Menus',
      foreignKey: 'RestaurantId',
    })

    models.Restaurant.belongsTo(models.User, {
      as: 'Owner',
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    })

    models.Restaurant.belongsToMany(models.FoodTag, {
      through: models.RestaurantFoodTag,
      unique: false,
    })
  }

  return Restaurant
}
