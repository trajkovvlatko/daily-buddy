import type { FindDrawerById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Drawer from 'src/components/Drawer/Drawer';

export const QUERY = gql`
  query FindDrawerById($id: Int!) {
    drawer: drawer(id: $id) {
      id
      level
      note
      storageUnitId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Drawer not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ drawer }: CellSuccessProps<FindDrawerById>) => {
  return <Drawer drawer={drawer} />;
};
