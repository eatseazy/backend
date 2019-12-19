import { GraphQLModule } from '@graphql-modules/core'

import AuthModule from '../auth'
import MenuModule from '../menu'
import BookingModule from '../booking'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const RestaurantModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [AuthModule, MenuModule, BookingModule]
})

export default RestaurantModule
