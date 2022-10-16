import { fetchCalendar } from 'src/helpers/fetchCalendar';
import { getCalendarParser } from 'src/helpers/getCalendarParser';
import { sortByTimestamp } from 'src/helpers/sortByTimestamp';

interface GetEventsProps {
  from: string;
  to: string;
}

const calendars = process.env.CALENDARS.split(';');

export const getEvents = async ({ from, to }: GetEventsProps) => {
  const calendarParser = getCalendarParser({ from, to });
  const calendarsData = await Promise.all(calendars.map(fetchCalendar));

  return calendarsData.flatMap(calendarParser).sort(sortByTimestamp);
};
