import { AuthenticationError } from 'apollo-server'

export default next => (root, args, context, info) => {
  if (!context.loggedUser) {
    throw new AuthenticationError('Unauthenticated')
  }

  return next(root, args, context, info)
}
