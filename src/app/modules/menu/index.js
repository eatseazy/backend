import { GraphQLModule } from '@graphql-modules/core'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const MenuModule = new GraphQLModule({
  typeDefs,
  resolvers
})

export default MenuModule
