import IcalExpander from 'ical-expander';
import { parseEvent } from './parseEvent';
import { Event, Occurance } from 'types/shared';

interface ParseCalendarProps {
  data: string;
  name: string;
  from: string;
  to: string;
}

interface GetCalendarParserProps {
  from: string;
  to: string;
}

export const getCalendarParser = ({ from, to }: GetCalendarParserProps) => {
  return ({ data, name }: ParseCalendarProps) => {
    const options = { ics: data, maxIterations: 100 };
    const icalExpander = new IcalExpander(options);
    const events = icalExpander.between(new Date(from), new Date(to));

    const mappedEvents = events.events.map((e: Event) =>
      parseEvent({ e, name })
    );
    const mappedOccurrences = events.occurrences.map((e: Occurance) =>
      parseEvent({ e, name })
    );

    return [...mappedEvents, ...mappedOccurrences];
  };
};
