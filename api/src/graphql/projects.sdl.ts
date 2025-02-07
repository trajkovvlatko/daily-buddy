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
    projectId: Int!
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
  }

  input CreateProjectTaskInput {
    name: String!
    description: String
    status: String!
    dueDate: DateTime
    labels: [String!]!
    projectStageId: Int!
  }

  input UpdateProjectTaskInput {
    name: String
    description: String
    status: String
    dueDate: DateTime
    labels: [String!]
    projectStageId: Int
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth

    createProjectStage(input: CreateProjectStageInput!): ProjectStage! @requireAuth
    updateProjectStage(id: Int!, input: UpdateProjectStageInput!): ProjectStage! @requireAuth
    deleteProjectStage(id: Int!): ProjectStage! @requireAuth
    updateProjectStagesSortOrder(projectId: Int!, sortOrder: [Int!]!): [ProjectStage!]! @requireAuth

    createProjectTask(input: CreateProjectTaskInput!): ProjectTask! @requireAuth
    updateProjectTask(id: Int!, input: UpdateProjectTaskInput!): ProjectTask! @requireAuth
    deleteProjectTask(id: Int!): ProjectTask! @requireAuth
    updateProjectTasksSortOrder(projectStageId: Int!, sortOrder: [Int!]!): [ProjectTask!]! @requireAuth
  }
`;
