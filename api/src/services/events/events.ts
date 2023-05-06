import NodeCache from 'node-cache';

import { fetchCalendar } from 'src/helpers/fetchCalendar';
import { getCalendarParser } from 'src/helpers/getCalendarParser';
import { groupByStartDate } from 'src/helpers/groupByStartDate';
import { sortByTimestamp } from 'src/helpers/sortByTimestamp';
import { db } from 'src/lib/db';

const cache = new NodeCache();

interface GetEventsProps {
  from: string;
  to: string;
  clearCache?: boolean;
}

const CACHE_KEY = 'events';
const CACHE_TTL = 10 * 24 * 60 * 60; // 10 days

export const getEvents = async ({ from, to, clearCache }: GetEventsProps, { context }) => {
  const userId = context.currentUser['id'];

  if (clearCache) cache.del(`${CACHE_KEY}-${userId}`);

  const response = cache.get(`${CACHE_KEY}-${userId}`);
  if (response) return response;

  const calendarParser = getCalendarParser({ from, to });
  const calendars = await db.calendar.findMany({
    where: { userId },
    select: { id: true, url: true, title: true, color: true },
  });
  const calendarsData = await Promise.all(calendars.map(fetchCalendar));
  const events = calendarsData.flatMap(calendarParser).sort(sortByTimestamp).reduce(groupByStartDate, []);

  cache.set(`${CACHE_KEY}-${userId}`, events, CACHE_TTL);

  return events;
};
