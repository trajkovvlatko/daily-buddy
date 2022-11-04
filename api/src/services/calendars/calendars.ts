import type { QueryResolvers, MutationResolvers, CalendarRelationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const calendars: QueryResolvers['calendars'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.calendar.findMany({ where: { userId } });
};

export const calendar: QueryResolvers['calendar'] = ({ id }) => {
  const userId = context.currentUser['id'];

  return db.calendar.findFirst({
    where: { id, userId },
  });
};

export const createCalendar: MutationResolvers['createCalendar'] = ({ input }) => {
  const userId = context.currentUser['id'];

  return db.calendar.create({
    data: { ...input, userId },
  });
};

export const updateCalendar: MutationResolvers['updateCalendar'] = async ({ id, input }) => {
  const userId = context.currentUser['id'];
  await db.calendar.findFirstOrThrow({ where: { userId, id } });

  return db.calendar.update({ data: input, where: { id } });
};

export const deleteCalendar: MutationResolvers['deleteCalendar'] = async ({ id }) => {
  const userId = context.currentUser['id'];
  await db.calendar.findFirstOrThrow({ where: { userId, id } });

  return db.calendar.delete({ where: { id } });
};

export const Calendar: CalendarRelationResolvers = {
  User: (_obj, { root }) => {
    return db.calendar.findUnique({ where: { id: root?.id } }).User();
  },
};
