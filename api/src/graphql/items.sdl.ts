export const schema = gql`
  type Item {
    id: Int!
    name: String!
    drawerId: Int!
    Color: Color!
    colorId: Int!
    ItemType: ItemType!
    itemTypeId: Int!
    imageFilename: String
    imageUrl: String
    imageHandle: String
  }

  type Query {
    items(drawerId: Int!): [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    name: String!
    drawerId: Int!
    colorId: Int!
    itemTypeId: Int!
  }

  input UpdateItemInput {
    name: String
    drawerId: Int
    colorId: Int
    itemTypeId: Int
    imageFilename: String
    imageUrl: String
    imageHandle: String
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`;
