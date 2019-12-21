import {
  compare,
  genSalt,
  hash,
} from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const _generatePasswordHash = async password => {
   try {
     const salt = await genSalt(10)

     return await hash(password, salt)
   } catch (error) {
     console.log('[MODELS:USER][_generatePasswordHash] > ', error)
   }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM(['ADMIN','MERCHANT','USER']),
    status: DataTypes.ENUM(['ENABLED','BLOCKED','DISABLED']),
  },
  {
    hooks: {
      beforeCreate: async user => {
        user.password = await _generatePasswordHash(user.password)
      },
    },
  })

  User.prototype.validPassword = async function (password) {
    try {
      return await compare(password, this.password)
    } catch (error) {
      if (error) console.log('[MODELS:USER][validPassword] > ', error)
    }
  }

  User.prototype.createToken = async function () {
    const {
      email,
      role,
      status,
    } = this

    return await sign(
      { email, role, status },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    )
  }

  User.associate = models => {
    models.User.hasOne(models.Restaurant)
  }

  return User
}
