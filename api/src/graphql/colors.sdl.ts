export const schema = gql`
  type Color {
    id: Int!
    color: String!
    createdAt: DateTime!
    User: User!
    userId: Int!
    Item: [Item]!
  }

  type Query {
    colors: [Color!]! @requireAuth
    color(id: Int!): Color @requireAuth
  }

  input CreateColorInput {
    color: String!
    userId: Int!
  }

  input UpdateColorInput {
    color: String
    userId: Int
  }

  type Mutation {
    createColor(input: CreateColorInput!): Color! @requireAuth
    updateColor(id: Int!, input: UpdateColorInput!): Color! @requireAuth
    deleteColor(id: Int!): Color! @requireAuth
  }
`;
