import { GraphQLModule } from '@graphql-modules/core'
import AuthModule from '../auth'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const MenuModule = new GraphQLModule({
  typeDefs,
  resolvers,
  imports: [AuthModule],
})

export default MenuModule
