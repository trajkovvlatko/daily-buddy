export const schema = gql`
  type Duration {
    days: Int!
    hours: Int!
    minutes: Int!
  }

  type Event {
    id: ID!
    calendar: String!
    summary: String!
    description: String
    startAt: String!
    startDate: String!
    startTime: String!
    duration: Duration!
  }

  type EventsByDate {
    startDate: String!
    events: [Event!]!
  }

  type Query {
    getEvents(from: String!, to: String!): [EventsByDate!]! @requireAuth
  }
`;
