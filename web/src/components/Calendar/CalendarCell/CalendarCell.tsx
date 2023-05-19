import type { FindCalendarById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Calendar from 'src/components/Calendar/Calendar';

export const QUERY = gql`
  query FindCalendarById($id: Int!) {
    calendar: calendar(id: $id) {
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

export const Empty = () => <div>Calendar not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ calendar }: CellSuccessProps<FindCalendarById>) => {
  return <Calendar calendar={calendar} />;
};
