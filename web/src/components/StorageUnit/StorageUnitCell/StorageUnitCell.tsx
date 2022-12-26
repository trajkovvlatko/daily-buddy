import type { FindStorageUnitById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import StorageUnit from 'src/components/StorageUnit/StorageUnit';

export const QUERY = gql`
  query FindStorageUnitById($id: Int!) {
    storageUnit: storageUnit(id: $id) {
      id
      name
      roomId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>StorageUnit not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ storageUnit }: CellSuccessProps<FindStorageUnitById>) => {
  return <StorageUnit storageUnit={storageUnit} />;
};
