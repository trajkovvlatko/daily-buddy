import { Occurance } from 'types/shared';

export const isOccurance = (e: any): e is Occurance => {
  return !!e && typeof e.item === 'object';
};
