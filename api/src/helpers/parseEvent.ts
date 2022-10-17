import { Event, Occurance, ParsedEvent } from 'types/shared';
import { isOccurance } from './isOccurance';
import { convertToTimeZone } from './convertToTimeZone';

interface ParseEventProps {
  e: Event | Occurance;
  name: string;
}

export const parseEvent = ({ e, name }: ParseEventProps): ParsedEvent => {
  const startAt = convertToTimeZone({ date: e.startDate._cachedUnixTime * 1000, timeZone: 'Europe/Stockholm' });

  return {
    id: isOccurance(e) ? e.item.uid : e.uid,
    calendar: name,
    startTimestamp: Date.parse(startAt),
    startAt,
    duration: {
      days: isOccurance(e) ? e.item.duration.days : e.duration.days,
      hours: isOccurance(e) ? e.item.duration.hours : e.duration.hours,
      minutes: isOccurance(e) ? e.item.duration.minutes : e.duration.minutes,
    },
    summary: isOccurance(e) ? e.item.summary : e.summary,
    description: isOccurance(e) ? e.item.description : e.description,
    startDate: startAt.split(' ')[0],
    startTime: startAt.split(' ')[1].slice(0, 5),
  };
};
