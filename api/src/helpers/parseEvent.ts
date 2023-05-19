import { CalendarData, Event, Occurance, ParsedEvent } from 'types/shared';

import { isOccurance } from './isOccurance';

interface ParseEventProps {
  e: Event | Occurance;
  calendar: CalendarData;
}

export const parseEvent = ({ e, calendar }: ParseEventProps): ParsedEvent => {
  const jsDate = e.startDate.toJSDate();
  const isoString = jsDate.toISOString();
  const local = new Date(isoString);
  // TODO: Fix this, convert to real local timezone
  local.setHours(local.getHours() + 2);
  const startAt = local.toISOString();

  return {
    id: isOccurance(e) ? e.item.uid : e.uid,
    calendar,
    startTimestamp: Date.parse(startAt),
    startAt,
    duration: {
      days: isOccurance(e) ? e.item.duration.days : e.duration.days,
      hours: isOccurance(e) ? e.item.duration.hours : e.duration.hours,
      minutes: isOccurance(e) ? e.item.duration.minutes : e.duration.minutes,
    },
    summary: isOccurance(e) ? e.item.summary : e.summary,
    description: isOccurance(e) ? e.item.description : e.description,
    startDate: startAt.split('T')[0],
    startTime: startAt.split('T')[1].slice(0, 5),
  };
};
