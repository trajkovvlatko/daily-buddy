import { fetchCalendar } from 'src/helpers/fetchCalendar';
import { getCalendarParser } from 'src/helpers/getCalendarParser';
import { groupByStartDate } from 'src/helpers/groupByStartDate';
import { sortByTimestamp } from 'src/helpers/sortByTimestamp';
import { db } from 'src/lib/db';

interface GetEventsProps {
  from: string;
  to: string;
}

export const getEvents = async ({ from, to }: GetEventsProps, { context }) => {
  const userId = context.currentUser['id'];
  const calendarParser = getCalendarParser({ from, to });
  const calendars = await db.calendar.findMany({ where: { userId }, select: { url: true, title: true } });
  const calendarsData = await Promise.all(calendars.map(fetchCalendar));

  return calendarsData.flatMap(calendarParser).sort(sortByTimestamp).reduce(groupByStartDate, []);
};
