export default {
  Query: {
    me: (root, args, { loggedUser }) => loggedUser
  },
}
