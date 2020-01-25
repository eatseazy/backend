module.exports = (sequelize, DataTypes) => {
  const RestaurantMenu = sequelize.define('RestaurantMenu', {
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

  RestaurantMenu.associate = models => {
    models.RestaurantMenu.belongsTo(models.Restaurant, {
      foreignKey: 'RestaurantId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  }

  return RestaurantMenu
}
