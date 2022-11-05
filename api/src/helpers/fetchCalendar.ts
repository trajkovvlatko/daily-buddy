import axios from 'axios';
import { CalendarData } from 'types/shared';

interface FetchCalendarResponse {
  calendar: CalendarData;
  data: string;
}

export const fetchCalendar = async (calendar: CalendarData): Promise<FetchCalendarResponse> => {
  const { data } = await axios({ method: 'get', url: calendar.url });

  return { calendar, data };
};
