export const schema = gql`
  type ItemType {
    id: Int!
    itemType: String!
    createdAt: DateTime!
    User: User!
    userId: Int!
    Item: [Item]!
  }

  type Query {
    itemTypes: [ItemType!]! @requireAuth
    itemType(id: Int!): ItemType @requireAuth
  }

  input CreateItemTypeInput {
    itemType: String!
    userId: Int!
  }

  input UpdateItemTypeInput {
    itemType: String
    userId: Int
  }

  type Mutation {
    createItemType(input: CreateItemTypeInput!): ItemType! @requireAuth
    updateItemType(id: Int!, input: UpdateItemTypeInput!): ItemType! @requireAuth
    deleteItemType(id: Int!): ItemType! @requireAuth
  }
`;
