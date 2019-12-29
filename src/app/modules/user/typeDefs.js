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
    login(input: LoginInput!): String!
    signup(input: UserInput!): String!
    activate(email: String!, token: String!): Boolean!
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

  input LoginInput {
    email: String!
    password: String!
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
