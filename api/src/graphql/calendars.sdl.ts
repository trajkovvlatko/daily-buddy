export const schema = gql`
  type Calendar {
    id: Int!
    title: String!
    color: String!
    url: String!
    User: User!
    createdAt: DateTime!
    userId: Int!
  }

  type Query {
    calendars: [Calendar!]! @requireAuth
    calendar(id: Int!): Calendar @requireAuth
  }

  input CreateCalendarInput {
    title: String!
    color: String!
    url: String!
  }

  input UpdateCalendarInput {
    title: String
    color: String
    url: String
  }

  type Mutation {
    createCalendar(input: CreateCalendarInput!): Calendar! @requireAuth
    updateCalendar(id: Int!, input: UpdateCalendarInput!): Calendar! @requireAuth
    deleteCalendar(id: Int!): Calendar! @requireAuth
  }
`;
