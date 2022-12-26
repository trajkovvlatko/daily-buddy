export const schema = gql`
  type Drawer {
    id: Int!
    level: Int!
    note: String
    storageUnitId: Int!
  }

  type Query {
    drawers: [Drawer!]! @requireAuth
    drawer(id: Int!): Drawer @requireAuth
  }

  input CreateDrawerInput {
    level: Int!
    note: String
    storageUnitId: Int!
  }

  input UpdateDrawerInput {
    level: Int
    note: String
    storageUnitId: Int
  }

  type Mutation {
    createDrawer(input: CreateDrawerInput!): Drawer! @requireAuth
    updateDrawer(id: Int!, input: UpdateDrawerInput!): Drawer! @requireAuth
    deleteDrawer(id: Int!): Drawer! @requireAuth
  }
`;
