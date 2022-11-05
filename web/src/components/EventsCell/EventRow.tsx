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
  const border = { borderLeft: `4px solid ${event.calendar.color}` };

  return (
    <div className="mt-2 ml-3 pt-3 pl-6 sm:ml-12" style={border}>
      <div>
        <b>{event.startTime}</b> - {event.summary}
      </div>
      <div className="pl-16 pt-3 text-sm italic">
        {event.calendar.title} - {duration}
      </div>
    </div>
  );
};

export default EventRow;
