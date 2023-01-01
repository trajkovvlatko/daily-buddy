import type { FindRooms } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Rooms from 'src/components/Room/Rooms';

export const QUERY = gql`
  query FindRooms {
    rooms {
      id
      name
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ rooms }: CellSuccessProps<FindRooms>) => {
  return <Rooms rooms={rooms} />;
};
