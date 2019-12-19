import { model, Schema } from 'mongoose'

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  menus: [{
    type: Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  description: {
    type: String
  },
  tags: {
    type: [String]
  }
})

const Restaurant = model('Restaurant', restaurantSchema)

export default Restaurant
