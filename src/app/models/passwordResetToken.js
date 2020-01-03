module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define('PasswordResetToken', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    UserId: DataTypes.UUID,
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },{
    updatedAt: false,
  })

  PasswordResetToken.associate = models => {
    models.PasswordResetToken.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'UserId',
      foreignKeyConstraint: true,
    })
  }

  return PasswordResetToken
}
