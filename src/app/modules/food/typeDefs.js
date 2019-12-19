import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    foods: [Food]!
  }

  type Mutation {
    createFood(input: FoodInput!): Food!
    updateFood(id: ID!, input: FoodInput!): Food!
    deleteFood(id: ID!): Boolean
  }

  type Food {
    id: ID!
    restaurantId: ID!
    name: String!
    type: TypeFood!
    price: Float!
  }

  input FoodInput {
    restaurantId: ID!
    name: String!
    type: TypeFood!
    price: Float!
  }

  enum TypeFood {
    STARTER
    MAIN_DISH
    DESSERT
    DRINK
  }`
