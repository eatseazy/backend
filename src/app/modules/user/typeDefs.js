import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean
    activate(email: String!, token: String!): Boolean!
  }

  input UserInput {
    email: String!
    password: String!
    role: Role!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    status: Status!
  }

  enum Role {
    ADMIN
    RESTAURANT
    CLIENT
  }

  enum Status {
    ENABLED
    BLOCKED
    DISABLED
  }`
