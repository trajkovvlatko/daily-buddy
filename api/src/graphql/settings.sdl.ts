export const schema = gql`
  type Setting {
    id: Int!
    key: String!
    value: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    settings: [Setting!]! @requireAuth
    setting(id: Int!): Setting @requireAuth
    settingByKey(key: String!): Setting @requireAuth
  }

  input CreateSettingInput {
    key: String!
    value: String!
  }

  input UpdateSettingInput {
    key: String
    value: String
  }

  type Mutation {
    createSetting(input: CreateSettingInput!): Setting! @requireAuth
    updateSetting(id: Int!, input: UpdateSettingInput!): Setting! @requireAuth
    deleteSetting(id: Int!): Setting! @requireAuth
  }
`;
