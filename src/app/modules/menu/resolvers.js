import models from '@models'

const {
  Menu,
} = models

export default {
  Query: {
    myMenu: () => {

    }
  },
  Mutation: {
    createMenu: async (...args) => {
      const [, { input }] = args

      const menu = await Menu.create({
        name: input.name,
        description: input.description || '',
      })

      console.log(menu)
    },
  },
}
