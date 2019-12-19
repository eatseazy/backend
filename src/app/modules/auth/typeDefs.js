import gql from 'graphql-tag'

export default gql`
  directive @auth on FIELD_DEFINITION
  directive @protect(role: String) on FIELD_DEFINITION

  type Query {
    me: User @auth
  }`
