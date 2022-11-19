export const schema = gql`
  type Note {
    id: Int!
    path: String!
    content: String!
  }

  type NoteTree {
    id: Int!
    path: String!
  }

  type Query {
    notes: [NoteTree!]! @requireAuth
    note(id: Int!): Note @requireAuth
  }

  input CreateNoteInput {
    path: String!
    content: String!
  }

  input UpdateNoteInput {
    path: String
    content: String
  }

  type Mutation {
    createNote(input: CreateNoteInput!): Note! @requireAuth
    updateNote(id: Int!, input: UpdateNoteInput!): Note! @requireAuth
    deleteNote(id: Int!): Note! @requireAuth
  }
`;
