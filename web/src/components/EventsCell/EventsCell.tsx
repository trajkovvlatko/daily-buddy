import { EventFields, EventsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { EventsByDateRow } from './EventsByDateRow';

interface Props {
  from: string;
  to: string;
}

export const beforeQuery = ({ from, to }: Props) => {
  return {
    variables: { from, to },
  };
};

export const QUERY = gql`
  fragment EventFields on EventsByDate {
    startDate
    events {
      id
      calendar {
        id
        title
        color
      }
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

  query EventsQuery($from: String!, $to: String!, $clearCache: Boolean) {
    getEvents(from: $from, to: $to, clearCache: $clearCache) {
      ...EventFields
    }
  }
`;

export const Loading = () => <div className="loading pb-6">Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => <div style={{ color: 'red' }}>Error: {error?.message}</div>;

export const Success = (props: CellSuccessProps<EventsQuery>) => {
  const {
    getEvents: events,
    queryResult: { refetch },
  } = props;
  const onRefresh = async () => {
    try {
      await refetch({ clearCache: true });
      toast.success('Agenda ready');
    } catch (e) {
      toast.error('Cannot refresh agenda');
    }
  };

  return (
    <div>
      <h1 className="mb-4 pb-3 text-lg font-semibold">
        Agenda
        <span onClick={onRefresh} className="refresh">
          ↻
        </span>
      </h1>

      <ul>
        {events.map((row: EventFields) => {
          return <EventsByDateRow row={row} key={`event-by-date-${row.startDate}`} />;
        })}
      </ul>
    </div>
  );
};
