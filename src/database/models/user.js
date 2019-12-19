import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    select: true
  },
  role: {
    type: String,
    enum: ['ADMIN','MERCHANT','COMPANY','USER'],
    required: true
  },
  status: {
    type: String,
    enum: ['ENABLED','BLOCKED','DISABLED'],
    required: true
  }
})

userSchema.pre('save', async function() {
  try {
    this.password = await hash(this.password, 10)
  } catch (error) {
    console.log("ERROR", error)
  }
})

userSchema.methods = {
  validatePassword: async function (password) {
    try {
      return await compare(password, this.password)
    } catch (error) {
      console.log("Err : ", error)
    }
  },
  createToken: async function () {
    const { email, role, status } = this

    return sign(
      { email, role, status },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
  }
}

const User = model('User', userSchema)

export default User
