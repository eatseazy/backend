import gql from 'graphql-tag'

export default gql`
  schema {
    query: Query
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean
    login(email: String!, password: String!): String!
    activate(email: String!, token: String!): Boolean!
    triggerPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, password: String!): Boolean!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role!
    status: Status!
  }

  input UserInput {
    email: String!
    password: String!
    role: Role!
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
