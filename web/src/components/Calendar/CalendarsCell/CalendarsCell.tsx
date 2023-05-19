import type { FindCalendars } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Calendars from 'src/components/Calendar/Calendars';

export const QUERY = gql`
  query FindCalendars {
    calendars {
      id
      title
      color
      url
      createdAt
      userId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No calendars yet. '}
      <Link to={routes.newCalendar()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ calendars }: CellSuccessProps<FindCalendars>) => {
  return <Calendars calendars={calendars} />;
};
