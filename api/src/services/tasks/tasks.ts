import type { QueryResolvers, MutationResolvers, TaskRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const tasks: QueryResolvers['tasks'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.task.findMany({ where: { userId } });
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
