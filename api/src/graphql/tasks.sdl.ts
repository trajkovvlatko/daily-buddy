export const schema = gql`
  type Task {
    id: Int!
    title: String!
    dueDate: DateTime
    priority: Int!
    completed: Boolean!
    completedAt: DateTime
    createdAt: DateTime!
    User: User!
    userId: Int!
  }

  type Tasks {
    todaysAgenda: [Task!]!
    notScheduledYet: [Task!]!
    next: [Task!]!
    doneRecently: [Task!]!
  }

  type Query {
    tasks: Tasks @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    title: String!
    dueDate: DateTime
    priority: Int!
    completed: Boolean
    completedAt: DateTime
  }

  input UpdateTaskInput {
    title: String
    dueDate: DateTime
    priority: Int
    completed: Boolean
    completedAt: DateTime
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`;
