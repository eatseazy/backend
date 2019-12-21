import gql from 'graphql-tag'

export default gql`
  schema {
    mutation: Mutation
  }

  type Mutation {
    createMenu(input: MenuInput): Menu!
  }

  type Menu {
    id: ID!
    title: String!
    description: String
  }

  input MenuInput {
    restaurant: ID!
    title: String!
    description: String
  }`
