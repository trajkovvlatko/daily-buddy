import IcalExpander from 'ical-expander';
import { parseEvent } from './parseEvent';
import { CalendarData, Event, Occurance } from 'types/shared';

interface ParseCalendarProps {
  data: string;
  calendar: CalendarData;
}

interface GetCalendarParserProps {
  from: string;
  to: string;
}

export const getCalendarParser = ({ from, to }: GetCalendarParserProps) => {
  return ({ data, calendar }: ParseCalendarProps) => {
    const options = { ics: data, maxIterations: 100 };
    const icalExpander = new IcalExpander(options);
    const events = icalExpander.between(new Date(from), new Date(to));

    const mappedEvents = events.events.map((e: Event) => parseEvent({ e, calendar }));
    const mappedOccurrences = events.occurrences.map((e: Occurance) => parseEvent({ e, calendar }));

    return [...mappedEvents, ...mappedOccurrences];
  };
};
