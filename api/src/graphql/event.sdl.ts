export const schema = gql`
  type Duration {
    days: Int!
    hours: Int!
    minutes: Int!
  }

  type CalendarData {
    id: ID!
    title: String!
    color: String!
  }

  type Event {
    id: ID!
    calendar: CalendarData!
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
    getEvents(from: String!, to: String!, clearCache: Boolean): [EventsByDate!]! @requireAuth
  }
`;
