export const schema = gql`
  type Streak {
    id: Int!
    name: String!
    last_date: DateTime!
  }

  type Query {
    streaks: [Streak!]! @requireAuth
    streak(id: Int!): Streak @requireAuth
  }

  input CreateStreakInput {
    name: String!
    last_date: DateTime!
  }

  input UpdateStreakInput {
    name: String
    last_date: DateTime
  }

  type Mutation {
    createStreak(input: CreateStreakInput!): Streak! @requireAuth
    updateStreak(id: Int!, input: UpdateStreakInput!): Streak! @requireAuth
    deleteStreak(id: Int!): Streak! @requireAuth
  }
`;
