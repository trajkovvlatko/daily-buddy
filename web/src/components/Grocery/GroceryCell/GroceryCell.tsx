import type { FindGroceryById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Grocery from 'src/components/Grocery/Grocery';

export const QUERY = gql`
  query FindGroceryById($id: Int!) {
    grocery: grocery(id: $id) {
      id
      name
      boughtAt
      expireAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Grocery not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ grocery }: CellSuccessProps<FindGroceryById>) => {
  return <Grocery grocery={grocery} />;
};
