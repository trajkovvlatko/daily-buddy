import type { FindStorageUnits } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import StorageUnits from 'src/components/StorageUnit/StorageUnits';

export const QUERY = gql`
  query FindStorageUnits($roomId: Int!) {
    storageUnits(roomId: $roomId) {
      id
      name
      roomId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ storageUnits }: CellSuccessProps<FindStorageUnits>) => {
  return <StorageUnits storageUnits={storageUnits} />;
};
