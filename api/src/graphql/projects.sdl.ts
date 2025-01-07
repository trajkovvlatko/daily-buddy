export const schema = gql`
  type Project {
    id: Int!
    name: String!
    description: String
    completedAt: DateTime
    stages: [ProjectStage!]!
  }

  type ProjectStage {
    id: Int!
    name: String!
    sortOrder: Int!
    color: String
    tasks: [ProjectTask!]!
  }

  type ProjectTask {
    id: Int!
    name: String!
    description: String
    status: String!
    sortOrder: Int!
    dueDate: DateTime
    labels: [String!]!
    projectStageId: Int!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    description: String
    completedAt: DateTime
  }

  input UpdateProjectInput {
    name: String
    description: String
    completedAt: DateTime
  }

  input CreateProjectStageInput {
    name: String!
    sortOrder: Int!
    color: String
    projectId: Int!
  }

  input UpdateProjectStageInput {
    name: String
    sortOrder: Int
    color: String
    projectId: Int!
  }

  input CreateProjectTaskInput {
    name: String!
    description: String
    status: String!
    sortOrder: Int!
    dueDate: DateTime
    labels: [String!]!
  }

  input UpdateProjectTaskInput {
    name: String
    description: String
    status: String
    sortOrder: Int
    dueDate: DateTime
    labels: [String!]
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth

    createProjectStage(input: CreateProjectStageInput!): ProjectStage! @requireAuth
    updateProjectStage(id: Int!, input: UpdateProjectStageInput!): ProjectStage! @requireAuth
    deleteProjectStage(id: Int!): ProjectStage! @requireAuth

    createProjectTask(input: CreateProjectTaskInput!): ProjectTask! @requireAuth
    updateProjectTask(id: Int!, input: UpdateProjectTaskInput!): ProjectTask! @requireAuth
    deleteProjectTask(id: Int!): ProjectTask! @requireAuth
  }
`;
