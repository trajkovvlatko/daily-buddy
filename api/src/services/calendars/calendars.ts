import type { QueryResolvers, MutationResolvers, CalendarRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const calendars: QueryResolvers['calendars'] = () => {
  return db.calendar.findMany();
};

export const calendar: QueryResolvers['calendar'] = ({ id }) => {
  return db.calendar.findUnique({
    where: { id },
  });
};

export const createCalendar: MutationResolvers['createCalendar'] = ({ input }) => {
  return db.calendar.create({
    data: input,
  });
};

export const updateCalendar: MutationResolvers['updateCalendar'] = ({ id, input }) => {
  return db.calendar.update({
    data: input,
    where: { id },
  });
};

export const deleteCalendar: MutationResolvers['deleteCalendar'] = ({ id }) => {
  return db.calendar.delete({
    where: { id },
  });
};

export const Calendar: CalendarRelationResolvers = {
  User: (_obj, { root }) => {
    return db.calendar.findUnique({ where: { id: root?.id } }).User();
  },
};
