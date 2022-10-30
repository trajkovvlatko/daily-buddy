import type { EventsByDate } from 'types/graphql';
import EventRow from './EventRow';

interface Props {
  row: EventsByDate;
}

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EventsByDateRow = ({ row }: Props) => {
  const d = new Date(row.startDate);
  const day = weekday[d.getDay()];

  return (
    <li className="events-by-date-row">
      <div className="event-by-day">
        {row.startDate} - {day}
      </div>
      {row.events.map((event) => {
        return <EventRow event={event} key={`event-${event.id}`} />;
      })}
    </li>
  );
};
