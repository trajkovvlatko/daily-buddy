export const schema = gql`
  type ShoppingList {
    id: Int!
    name: String!
    shoppingListItems: ShoppingListItems!
    emails: [String!]
    shared: Boolean
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

  type BasicShoppingList {
    id: Int!
    name: String!
  }

  type Mutation {
    createShoppingList(input: CreateShoppingListInput!): BasicShoppingList! @requireAuth
    updateShoppingList(id: Int!, input: UpdateShoppingListInput!): BasicShoppingList! @requireAuth
    deleteShoppingList(id: Int!): BasicShoppingList! @requireAuth
  }
`;
