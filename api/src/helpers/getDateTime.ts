import { pad } from './pad';

export const getDateTime = (obj: Date) => {
  const date = [obj.getFullYear(), pad(obj.getMonth() + 1), pad(obj.getDate())].join('-');
  const time = [pad(obj.getHours()), pad(obj.getMinutes())].join(':');

  return [date, time].join(' ');
};
