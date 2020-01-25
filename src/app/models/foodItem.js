module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define('FoodItem', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categorie: {
      type: DataTypes.ENUM([
        'STARTER',
        'DISHES',
        'DRINK',
        'ALCOHOLIC_DRINK',
        'CHEESE',
        'DESSERT'
      ]),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceHT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    priceTTC: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  })

  return FoodItem
}
