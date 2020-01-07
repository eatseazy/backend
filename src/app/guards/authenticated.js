import { AuthenticationError } from 'apollo-server'

export default next => (root, args, context, info) => {
  if (!context.loggedUser) throw new AuthenticationError("Vous n'êtes pas connecté")

  return next(root, args, context, info)
}
