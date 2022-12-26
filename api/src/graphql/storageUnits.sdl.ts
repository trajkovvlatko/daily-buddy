export const schema = gql`
  type StorageUnit {
    id: Int!
    name: String!
    createdAt: DateTime!
    Room: Room!
    roomId: Int!
    User: User!
    userId: Int!
    Drawer: [Drawer]!
  }

  type Query {
    storageUnits: [StorageUnit!]! @requireAuth
    storageUnit(id: Int!): StorageUnit @requireAuth
  }

  input CreateStorageUnitInput {
    name: String!
    roomId: Int!
    userId: Int!
  }

  input UpdateStorageUnitInput {
    name: String
    roomId: Int
    userId: Int
  }

  type Mutation {
    createStorageUnit(input: CreateStorageUnitInput!): StorageUnit! @requireAuth
    updateStorageUnit(id: Int!, input: UpdateStorageUnitInput!): StorageUnit! @requireAuth
    deleteStorageUnit(id: Int!): StorageUnit! @requireAuth
  }
`;
