import { Event, Occurance } from 'types/shared';
import { getDateTime } from './getDateTime';
import { isOccurance } from './isOccurance';

interface ParseEventProps {
  e: Event | Occurance;
  name: string;
}

export const parseEvent = ({ e, name }: ParseEventProps) => {
  const startAt = getDateTime(e.startDate);
  const endAt = getDateTime(e.endDate);

  return {
    calendar: name,
    startTimestamp: Date.parse(startAt),
    startAt,
    endAt,
    duration: {
      days: isOccurance(e) ? e.item.duration.days : e.duration.days,
      hours: isOccurance(e) ? e.item.duration.hours : e.duration.hours,
      minutes: isOccurance(e) ? e.item.duration.minutes : e.duration.minutes,
    },
    summary: isOccurance(e) ? e.item.summary : e.summary,
    description: isOccurance(e) ? e.item.description : e.description,
  };
};
