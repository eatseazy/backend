import { GraphQLModule } from '@graphql-modules/core'
import { AuthModule } from '@modules'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const RestaurantModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [AuthModule]
})

export default RestaurantModule
