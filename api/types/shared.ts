export interface EventDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  isDate: boolean;
  timezone: string;
}

export interface EventDuration {
  days: number;
  hours: number;
  minutes: number;
}

export interface Event {
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
    duration: EventDuration;
    summary: string;
    description: string;
  };
}
