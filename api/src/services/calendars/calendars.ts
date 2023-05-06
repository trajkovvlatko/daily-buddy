import { db } from 'src/lib/db';
import type { QueryResolvers, MutationResolvers } from 'types/graphql';

export const calendars: QueryResolvers['calendars'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.calendar.findMany({ where: { userId } });
};

export const calendar: QueryResolvers['calendar'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.calendar.findFirst({
    where: { id, userId },
  });
};

export const createCalendar: MutationResolvers['createCalendar'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.calendar.create({
    data: { ...input, userId },
  });
};

export const updateCalendar: MutationResolvers['updateCalendar'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.calendar.findFirstOrThrow({ where: { userId, id } });

  return db.calendar.update({ data: input, where: { id } });
};

export const deleteCalendar: MutationResolvers['deleteCalendar'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.calendar.findFirstOrThrow({ where: { userId, id } });

  return db.calendar.delete({ where: { id } });
};
