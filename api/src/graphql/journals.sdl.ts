export const schema = gql`
  type Journal {
    id: Int!
    forDate: DateTime!
    content: String!
    createdAt: DateTime!
    User: User!
    userId: Int!
  }

  type Query {
    journals: [Journal!]! @requireAuth
    journal(id: Int!): Journal @requireAuth
  }

  input CreateJournalInput {
    forDate: DateTime!
    content: String!
    userId: Int!
  }

  input UpdateJournalInput {
    forDate: DateTime
    content: String
    userId: Int
  }

  type Mutation {
    createJournal(input: CreateJournalInput!): Journal! @requireAuth
    updateJournal(id: Int!, input: UpdateJournalInput!): Journal! @requireAuth
    deleteJournal(id: Int!): Journal! @requireAuth
  }
`;
