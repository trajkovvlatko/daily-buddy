import type { FindStorageUnits } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import StorageUnits from 'src/components/StorageUnit/StorageUnits';

export const QUERY = gql`
  query FindStorageUnits {
    storageUnits {
      id
      name
      roomId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No storageUnits yet. '}
      <Link to={routes.newStorageUnit()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ storageUnits }: CellSuccessProps<FindStorageUnits>) => {
  return <StorageUnits storageUnits={storageUnits} />;
};
