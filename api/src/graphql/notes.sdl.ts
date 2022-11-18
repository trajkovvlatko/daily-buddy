export const schema = gql`
  type Note {
    id: Int!
    parentId: Int!
    title: String!
    content: String!
  }

  type NoteTree {
    id: Int!
    parentId: Int!
    path: String!
  }

  type Query {
    notes: [NoteTree!]! @requireAuth
    note(id: Int!): Note @requireAuth
  }

  input CreateNoteInput {
    parentId: Int!
    title: String!
    content: String!
  }

  input UpdateNoteInput {
    parentId: Int
    title: String
    content: String
  }

  type Mutation {
    createNote(input: CreateNoteInput!): Note! @requireAuth
    updateNote(id: Int!, input: UpdateNoteInput!): Note! @requireAuth
    deleteNote(id: Int!): Note! @requireAuth
  }
`;
