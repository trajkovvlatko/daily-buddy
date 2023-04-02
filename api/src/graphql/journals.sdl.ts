export const schema = gql`
  type Journal {
    id: Int!
    forDate: DateTime!
    content: String!
  }

  type Query {
    journals: [Journal!]! @requireAuth
    journal(id: Int!): Journal @requireAuth
    journalByDate(date: Date): Journal @requireAuth
  }

  input CreateJournalInput {
    forDate: DateTime!
    content: String!
  }

  input UpdateJournalInput {
    forDate: DateTime
    content: String
  }

  type Mutation {
    createJournal(input: CreateJournalInput!): Journal! @requireAuth
    updateJournal(id: Int!, input: UpdateJournalInput!): Journal! @requireAuth
    deleteJournal(id: Int!): Journal! @requireAuth
  }
`;
