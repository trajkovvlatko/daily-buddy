export const schema = gql`
  type Color {
    id: Int!
    color: String!
  }

  type Query {
    colors: [Color!]! @requireAuth
    color(id: Int!): Color @requireAuth
  }

  input CreateColorInput {
    color: String!
  }

  input UpdateColorInput {
    color: String
  }

  type Mutation {
    createColor(input: CreateColorInput!): Color! @requireAuth
    updateColor(id: Int!, input: UpdateColorInput!): Color! @requireAuth
    deleteColor(id: Int!): Color! @requireAuth
  }
`;
