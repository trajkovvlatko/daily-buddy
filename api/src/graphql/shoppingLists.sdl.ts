export const schema = gql`
  type ShoppingList {
    id: Int!
    name: String!
  }

  type Query {
    shoppingLists: [ShoppingList!]! @requireAuth
    shoppingList(id: Int!): ShoppingList @requireAuth
  }

  input CreateShoppingListInput {
    name: String!
  }

  input UpdateShoppingListInput {
    name: String
  }

  type Mutation {
    createShoppingList(input: CreateShoppingListInput!): ShoppingList! @requireAuth
    updateShoppingList(id: Int!, input: UpdateShoppingListInput!): ShoppingList! @requireAuth
    deleteShoppingList(id: Int!): ShoppingList! @requireAuth
  }
`;
