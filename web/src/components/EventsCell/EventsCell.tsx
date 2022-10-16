import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { EventsQuery } from 'types/graphql';
import { EventsByDateRow } from './EventsByDateRow';

interface Props {
  from: string;
  to: string;
}

export const beforeQuery = ({ from, to }: Props) => {
  return {
    variables: { from, to },
    fetchPolicy: 'cache-and-network',
  };
};

export const QUERY = gql`
  query EventsQuery($from: String!, $to: String!) {
    getEvents(from: $from, to: $to) {
      startDate
      events {
        id
        calendar
        summary
        description
        startAt
        endAt
        startDate
        startTime
        duration {
          days
          hours
          minutes
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => <div style={{ color: 'red' }}>Error: {error?.message}</div>;

export const Success = ({ getEvents: events }: CellSuccessProps<EventsQuery>) => {
  return (
    <ul>
      {events.map((row: any) => (
        <EventsByDateRow row={row} />
      ))}
    </ul>
  );
};
