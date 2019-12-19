import { model, Schema } from 'mongoose'

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['STARTER', 'MAIN_DISH', 'DESSERT', 'DRINK'],
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Food = model('Food', foodSchema)

export default Food
