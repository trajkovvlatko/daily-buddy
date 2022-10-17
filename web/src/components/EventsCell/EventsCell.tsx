import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { EventFields, EventsQuery } from 'types/graphql';
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
  fragment EventFields on EventsByDate {
    startDate
    events {
      id
      calendar
      summary
      description
      startAt
      startDate
      startTime
      duration {
        days
        hours
        minutes
      }
    }
  }
  query EventsQuery($from: String!, $to: String!) {
    getEvents(from: $from, to: $to) {
      ...EventFields
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => <div style={{ color: 'red' }}>Error: {error?.message}</div>;

export const Success = ({ getEvents: events }: CellSuccessProps<EventsQuery>) => {
  return (
    <ul>
      {events.map((row: EventFields) => {
        return <EventsByDateRow row={row} key={`event-by-date-${row.startDate}`} />;
      })}
    </ul>
  );
};
