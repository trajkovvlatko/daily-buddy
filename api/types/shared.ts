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
  calendar: string;
  startTimestamp: number;
  startAt: string;
  duration: EventDuration;
  summary: string;
  description?: string;
  startDate: string;
  startTime: string;
}
