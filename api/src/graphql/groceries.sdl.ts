export const schema = gql`
  type Grocery {
    id: Int!
    name: String!
    boughtAt: DateTime!
    expireAt: DateTime!
  }

  type Query {
    groceries: [Grocery!]! @requireAuth
    grocery(id: Int!): Grocery @requireAuth
  }

  input CreateGroceryInput {
    name: String!
    boughtAt: DateTime!
    expireAt: DateTime!
  }

  input UpdateGroceryInput {
    name: String
    boughtAt: DateTime
    expireAt: DateTime
  }

  type Mutation {
    createGrocery(input: CreateGroceryInput!): Grocery! @requireAuth
    updateGrocery(id: Int!, input: UpdateGroceryInput!): Grocery! @requireAuth
    deleteGrocery(id: Int!): Grocery! @requireAuth
  }
`;
