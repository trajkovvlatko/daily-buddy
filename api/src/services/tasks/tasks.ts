import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const tasks: QueryResolvers['tasks'] = async (_, { context }) => {
  const userId = context.currentUser['id'];

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaysAgendaPromise = db.task.findMany({
    where: { userId, dueDate: { lt: tomorrow }, completed: false },
    orderBy: { dueDate: 'asc' },
    take: 20,
  });

  const notScheduledYetPromise = db.task.findMany({
    where: { userId, dueDate: null, completed: false },
    orderBy: { dueDate: 'asc' },
    take: 20,
  });

  const nextPromise = db.task.findMany({
    where: { userId, dueDate: { gt: today }, completed: false },
    orderBy: { dueDate: 'asc' },
    take: 5,
  });

  const doneRecentlyPromise = db.task.findMany({
    where: { userId, completed: true },
    orderBy: { dueDate: 'desc' },
    take: 5,
  });

  const [todaysAgenda, notScheduledYet, next, doneRecently] = await Promise.all([
    todaysAgendaPromise,
    notScheduledYetPromise,
    nextPromise,
    doneRecentlyPromise,
  ]);

  return { todaysAgenda, notScheduledYet, next, doneRecently };
};

export const task: QueryResolvers['task'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.task.findFirst({
    where: { id, userId },
  });
};

export const createTask: MutationResolvers['createTask'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.task.create({
    data: { ...input, userId },
  });
};

export const updateTask: MutationResolvers['updateTask'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.task.findFirstOrThrow({ where: { userId, id } });

  return db.task.update({ data: input, where: { id } });
};

export const deleteTask: MutationResolvers['deleteTask'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.task.findFirstOrThrow({ where: { userId, id } });

  return db.task.delete({ where: { id } });
};

export const deleteAllDone: MutationResolvers['deleteAllDone'] = async (_, { context }) => {
  const userId = context.currentUser['id'];

  const deleted = await db.task.deleteMany({ where: { userId, completed: true } });

  return deleted.count;
};
