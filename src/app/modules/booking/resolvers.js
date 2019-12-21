/*import { Booking, Restaurant } from '../../../database/models'

export default {
  Mutation: {
    createBooking: async (...args) => {
      const [, { input }, { loggedUser }] = args

      if (!loggedUser) throw new Error('You are not authenticated')

      const restaurant = await Restaurant.findOne({ _id: input.restaurantId })
      if (!restaurant) throw new Error('An error has occured, Restaurant does not exist !')

      const newBooking = await Booking.create({ ...input })

      restaurant.bookings.push(newBooking._id)
      await restaurant.save()

      return newBooking.populate('restaurant').execPopulate()
    }
  }
}*/
