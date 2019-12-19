import { GraphQLModule } from '@graphql-modules/core'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const UserModule = new GraphQLModule({
  typeDefs,
  resolvers
})

export default UserModule
