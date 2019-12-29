module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    UserId: DataTypes.UUID,
    token: DataTypes.STRING,
  })

  VerificationToken.associate = models => {
    models.VerificationToken.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'UserId',
      foreignKeyConstraint: true,
    })
  }

  return VerificationToken
}
