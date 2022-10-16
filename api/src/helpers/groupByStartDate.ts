import { ParsedEvent } from 'types/shared';

interface EventResponse {
  startDate: string;
  events: ParsedEvent[];
}

export const groupByStartDate = (acc: EventResponse[], row: ParsedEvent) => {
  const existing = acc.find((i) => i.startDate === row.startDate);
  if (existing) {
    const newExisting = { startDate: row.startDate, events: [...existing.events, row] };
    const newAcc = acc.filter((i) => i.startDate !== row.startDate);

    return [...newAcc, newExisting];
  } else {
    return [...acc, { startDate: row.startDate, events: [row] }];
  }
};
