export const schema = gql`
  type Room {
    id: Int!
    name: String!
    createdAt: DateTime!
    User: User!
    userId: Int!
    StorageUnit: [StorageUnit]!
  }

  type Query {
    rooms: [Room!]! @requireAuth
    room(id: Int!): Room @requireAuth
  }

  input CreateRoomInput {
    name: String!
    userId: Int!
  }

  input UpdateRoomInput {
    name: String
    userId: Int
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): Room! @requireAuth
    updateRoom(id: Int!, input: UpdateRoomInput!): Room! @requireAuth
    deleteRoom(id: Int!): Room! @requireAuth
  }
`;
