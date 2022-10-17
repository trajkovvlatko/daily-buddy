import type { EventsByDate } from 'types/graphql';

interface Props {
  row: EventsByDate;
}

export const EventsByDateRow = ({ row }: Props) => {
  return (
    <li key={`row-${row.startDate}`}>
      <small>{row.startDate}</small>
      {row.events.map((event) => {
        return (
          <p key={`event-${event.id}`}>
            {event.startTime} - {event.summary} <small>({event.calendar})</small>
          </p>
        );
      })}
    </li>
  );
};
