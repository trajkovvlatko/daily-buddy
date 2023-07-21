export const schema = gql`
  type ShoppingListItem {
    id: Int!
    name: String!
  }

  input UpdateShoppingListItemInput {
    shoppingListId: Int!
    name: String
  }

  type Mutation {
    updateShoppingListItem(id: Int!, input: UpdateShoppingListItemInput!): ShoppingListItem! @requireAuth
  }
`;
