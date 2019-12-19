import { GraphQLModule } from '@graphql-modules/core'
import { verify } from 'jsonwebtoken'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const AuthModule = new GraphQLModule({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization']
    if (req && token) {
      try {
        return { loggedUser: await verify(token, process.env.JWT_SECRET) }
      } catch (error) {
        throw new Error('Your session expired. Sign in again.')
      }
    }
    return { loggedUser: null }
  },
})

export default AuthModule
