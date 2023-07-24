export const schema = gql`
  type ShoppingListItems {
    pending: [ShoppingListItem!]!
    bought: [ShoppingListItem!]!
  }

  type ShoppingListItem {
    id: Int!
    name: String!
    bought: Boolean!
  }

  input UpdateShoppingListItemInput {
    shoppingListId: Int!
    name: String
    bought: Boolean
  }

  input CreateShoppingListItemInput {
    shoppingListId: Int!
    name: String!
  }

  type Mutation {
    updateShoppingListItem(id: Int!, input: UpdateShoppingListItemInput!): ShoppingListItem! @requireAuth
    createShoppingListItem(input: CreateShoppingListItemInput!): ShoppingListItem! @requireAuth
    deleteAllBoughtItems(shoppingListId: Int!): Boolean! @requireAuth
  }
`;
