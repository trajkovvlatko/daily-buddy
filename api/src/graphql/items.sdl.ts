export const schema = gql`
  type Item {
    id: Int!
    name: String!
    createdAt: DateTime!
    Drawer: Drawer!
    drawerId: Int!
    User: User!
    userId: Int!
    Color: Color!
    colorId: Int!
    ItemType: ItemType!
    itemTypeId: Int!
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    name: String!
    drawerId: Int!
    userId: Int!
    colorId: Int!
    itemTypeId: Int!
  }

  input UpdateItemInput {
    name: String
    drawerId: Int
    userId: Int
    colorId: Int
    itemTypeId: Int
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`;
