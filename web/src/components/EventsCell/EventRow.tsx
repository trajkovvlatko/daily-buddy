import { Event } from 'types/graphql';

interface Props {
  event: Event;
}

const withPlural = (n: number) => (n === 1 ? '' : 's');

const EventRow = ({ event }: Props) => {
  const { days, hours, minutes } = event.duration;
  const duration = [
    days ? `${days} day${withPlural(days)}` : '',
    hours ? `${hours} hour${withPlural(hours)}` : '',
    minutes ? `${minutes} minute${withPlural(minutes)}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="event">
      <div>
        <b>{event.startTime}</b> - {event.summary}
      </div>
      <div className="duration">
        {event.calendar} - {duration}
      </div>
    </div>
  );
};

export default EventRow;
