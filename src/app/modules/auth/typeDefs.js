import gql from 'graphql-tag'

export default gql`
  directive @auth on FIELD_DEFINITION
  directive @protect(role: String) on FIELD_DEFINITION

  type Query {
    me: User @auth
  }

  type Mutation {
    register(input: RegisterInput!): User!
    login(email: String!, password: String!): String!
    triggerPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, password: String!): Boolean!
  }

  input RegisterInput {
    email: String!,
    password: String!,
    role: Role!,
  }`
