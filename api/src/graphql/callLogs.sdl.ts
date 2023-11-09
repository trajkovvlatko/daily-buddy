export const schema = gql`
  type CallLog {
    id: Int!
    note: String!
  }

  type Query {
    callLogs(personId: Int!): [CallLog!]! @requireAuth
    callLog(personId: Int!, id: Int!): CallLog @requireAuth
  }

  input CreateCallLogInput {
    note: String!
    personId: Int!
  }

  input UpdateCallLogInput {
    note: String
  }

  type Mutation {
    createCallLog(input: CreateCallLogInput!): CallLog! @requireAuth
    updateCallLog(id: Int!, input: UpdateCallLogInput!): CallLog! @requireAuth
    deleteCallLog(id: Int!): CallLog! @requireAuth
  }
`;
