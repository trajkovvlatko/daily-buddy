export const schema = gql`
  type ItemType {
    id: Int!
    itemType: String!
  }

  type Query {
    itemTypes: [ItemType!]! @requireAuth
    itemType(id: Int!): ItemType @requireAuth
  }

  input CreateItemTypeInput {
    itemType: String!
  }

  input UpdateItemTypeInput {
    itemType: String
  }

  type Mutation {
    createItemType(input: CreateItemTypeInput!): ItemType! @requireAuth
    updateItemType(id: Int!, input: UpdateItemTypeInput!): ItemType! @requireAuth
    deleteItemType(id: Int!): ItemType! @requireAuth
  }
`;
