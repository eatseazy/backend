import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    restaurants: [Restaurant!]! @auth
    myRestaurant: Restaurant! @auth
  }

  type Mutation {
    createRestaurant(input: RestaurantInput!): Restaurant! @auth
    updateRestaurant(input: RestaurantInput!): Restaurant! @auth
    deleteRestaurant(id: ID!): Boolean! @auth
  }

  type Restaurant {
    id: ID!
    name: String!
    phone: String!
    bookings: [Booking]!
    menus: [Menu]!
    description: String
    address: String
    city: String
    zipCode: String
    tags: [String]
    Owner: User!
  }

  input RestaurantInput {
    name: String
    phone: String
    description: String
    address: String
    city: String
    zipCode: String
    tags: [String]
  }`
