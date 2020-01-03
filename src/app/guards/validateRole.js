import { AuthenticationError } from 'apollo-server'

export default role => next => (root, args, context, info) => {
  if (context.loggedUser.role !== role) {
    throw new AuthenticationError('Unauthorized !')
  }

  return next(root, args, context, info)
}
