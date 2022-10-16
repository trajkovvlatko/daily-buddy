import axios from 'axios';

interface FetchCalendarResponse {
  name: string;
  data: string;
}

export const fetchCalendar = async (
  calendar: string
): Promise<FetchCalendarResponse> => {
  const [name, url] = calendar.split('=');
  const { data } = await axios({ method: 'get', url });

  return { name, data };
};
