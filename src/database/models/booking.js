import { model, Schema } from 'mongoose'

const bookingSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  guest: {
    type: Number,
    required: true
  }
})

const Booking = model('Booking', bookingSchema)

export default Booking
