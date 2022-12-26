export const schema = gql`
  type Room {
    id: Int!
    name: String!
  }

  type Query {
    rooms: [Room!]! @requireAuth
    room(id: Int!): Room @requireAuth
  }

  input CreateRoomInput {
    name: String!
  }

  input UpdateRoomInput {
    name: String
  }

  type Mutation {
    createRoom(input: CreateRoomInput!): Room! @requireAuth
    updateRoom(id: Int!, input: UpdateRoomInput!): Room! @requireAuth
    deleteRoom(id: Int!): Room! @requireAuth
  }
`;
