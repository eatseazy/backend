import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    bookings: [Booking]!
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking!
  }

  type Booking {
    id: ID!
    guest: Int!
  }

  input BookingInput {
    restaurantId: ID!
    guest: Int!
  }`
