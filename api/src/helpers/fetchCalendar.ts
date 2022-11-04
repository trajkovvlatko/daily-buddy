import axios from 'axios';

interface FetchCalendarResponse {
  title: string;
  data: string;
}

export const fetchCalendar = async ({ url, title }: { url: string; title: string }): Promise<FetchCalendarResponse> => {
  const { data } = await axios({ method: 'get', url });

  return { title, data };
};
