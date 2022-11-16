export interface EventDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isDate: boolean;
  timezone: string;
  _cachedUnixTime: number;
  toJSDate: () => any;
  _time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
}

export interface EventDuration {
  days: number;
  hours: number;
  minutes: number;
}

export interface Event {
  uid: string;
  startDate: EventDate;
  endDate: EventDate;
  duration: EventDuration;
  summary: string;
  description: string;
}

export interface Occurance {
  startDate: EventDate;
  endDate: EventDate;
  item: {
    uid: string;
    duration: EventDuration;
    summary: string;
    description: string;
  };
}

export interface ParsedEvent {
  id: string;
  calendar: CalendarData;
  startTimestamp: number;
  startAt: string;
  duration: EventDuration;
  summary: string;
  description?: string;
  startDate: string;
  startTime: string;
}

export interface CalendarData {
  id: number;
  title: string;
  url: string;
  color: string;
}
