export const schema = gql`
  type StorageUnit {
    id: Int!
    name: String!
    roomId: Int!
  }

  type Query {
    storageUnits(roomId: Int!): [StorageUnit!]! @requireAuth
    storageUnit(id: Int!): StorageUnit @requireAuth
  }

  input CreateStorageUnitInput {
    name: String!
    roomId: Int!
  }

  input UpdateStorageUnitInput {
    name: String
    roomId: Int
  }

  type Mutation {
    createStorageUnit(input: CreateStorageUnitInput!): StorageUnit! @requireAuth
    updateStorageUnit(id: Int!, input: UpdateStorageUnitInput!): StorageUnit! @requireAuth
    deleteStorageUnit(id: Int!): StorageUnit! @requireAuth
  }
`;
