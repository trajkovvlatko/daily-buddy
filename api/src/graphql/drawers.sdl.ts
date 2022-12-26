export const schema = gql`
  type Drawer {
    id: Int!
    level: Int!
    note: String
    createdAt: DateTime!
    StorageUnit: StorageUnit!
    storageUnitId: Int!
    User: User!
    userId: Int!
    Item: [Item]!
  }

  type Query {
    drawers: [Drawer!]! @requireAuth
    drawer(id: Int!): Drawer @requireAuth
  }

  input CreateDrawerInput {
    level: Int!
    note: String
    storageUnitId: Int!
    userId: Int!
  }

  input UpdateDrawerInput {
    level: Int
    note: String
    storageUnitId: Int
    userId: Int
  }

  type Mutation {
    createDrawer(input: CreateDrawerInput!): Drawer! @requireAuth
    updateDrawer(id: Int!, input: UpdateDrawerInput!): Drawer! @requireAuth
    deleteDrawer(id: Int!): Drawer! @requireAuth
  }
`;
