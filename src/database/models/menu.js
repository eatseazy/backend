import { model, Schema } from 'mongoose'

const menuSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

const Menu = model('Menu', menuSchema)

export default Menu
