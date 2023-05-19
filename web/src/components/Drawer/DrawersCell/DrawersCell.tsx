import type { FindDrawers } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Drawers from 'src/components/Drawer/Drawers';

export const QUERY = gql`
  query FindDrawers($storageUnitId: Int!) {
    drawers(storageUnitId: $storageUnitId) {
      id
      level
      note
      storageUnitId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ drawers }: CellSuccessProps<FindDrawers>) => {
  return <Drawers drawers={drawers} />;
};
