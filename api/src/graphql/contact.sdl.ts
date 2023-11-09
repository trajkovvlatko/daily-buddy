export const schema = gql`
  type Query {
    contact: Person! @requireAuth
  }
`;
