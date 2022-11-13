import type { QueryResolvers, MutationResolvers, TaskRelationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const tasks: QueryResolvers['tasks'] = async (_, { context }) => {
  console.log(1, new Date());

  const userId = context.currentUser['id'];
  console.log(2, new Date());

  const today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);
  console.log(3, new Date());

  const todaysAgendaPromise = db.task.findMany({
    where: { userId, dueDate: { lt: today }, completed: false },
    orderBy: { dueDate: 'asc' },
  });
  console.log(4, new Date());

  const notScheduledYetPromise = db.task.findMany({
    where: { userId, dueDate: null, completed: false },
    orderBy: { dueDate: 'asc' },
  });
  console.log(5, new Date());

  const nextPromise = db.task.findMany({
    where: { userId, dueDate: { gt: today }, completed: false },
    orderBy: { dueDate: 'asc' },
    take: 5,
  });
  console.log(6, new Date());

  const doneRecentlyPromise = db.task.findMany({
    where: { userId, completed: true },
    orderBy: { dueDate: 'desc' },
    take: 5,
  });
  console.log(7, new Date());

  const [todaysAgenda, notScheduledYet, next, doneRecently] = await Promise.all([
    todaysAgendaPromise,
    notScheduledYetPromise,
    nextPromise,
    doneRecentlyPromise,
  ]);
  console.log(8, new Date());

  return { todaysAgenda, notScheduledYet, next, doneRecently };
};

export const task: QueryResolvers['task'] = ({ id }) => {
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

export const Task: TaskRelationResolvers = {
  User: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).User();
  },
};
