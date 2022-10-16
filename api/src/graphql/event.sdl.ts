export const schema = gql`
  type Duration {
    days: Int!
    hours: Int!
    minutes: Int!
  }

  type Event {
    calendar: String!
    summary: String!
    description: String!
    startAt: String!
    endAt: String!
    duration: Duration!
  }

  type Query {
    getEvents(from: String!, to: String!): [Event!]! @skipAuth
  }
`;
