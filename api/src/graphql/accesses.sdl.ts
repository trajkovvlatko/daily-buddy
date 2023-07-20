export const schema = gql`
  input SetAccessInput {
    id: Int!
    type: String!
    emails: [String!]!
  }

  type Mutation {
    access(input: SetAccessInput!): Boolean! @requireAuth
  }
`
