import gql from 'graphql-tag'

export default gql`
  schema {
    mutation: Mutation
  }

  type Mutation {
    signS3(fileName: String!, fileType: String!): String! @auth
  }`
