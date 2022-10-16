import { EventDate } from 'types/shared';
import { pad } from './pad';

export const getDateTime = (obj: EventDate) => {
  const date = [pad(obj.year), pad(obj.month), pad(obj.day)].join('-');
  const time = [pad(obj.hour), pad(obj.minute)].join(':');

  return [date, time].join(' ');
};
