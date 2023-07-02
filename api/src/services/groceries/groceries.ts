import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const groceries: QueryResolvers['groceries'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.grocery.findMany({
    where: { userId },
    orderBy: { expireAt: 'asc' },
  });
};

export const grocery: QueryResolvers['grocery'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.grocery.findFirst({
    where: { id, userId },
  });
};

export const createGrocery: MutationResolvers['createGrocery'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.grocery.create({
    data: { ...input, userId },
  });
};

export const updateGrocery: MutationResolvers['updateGrocery'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.grocery.findFirstOrThrow({ where: { userId, id } });

  return db.grocery.update({ data: input, where: { id } });
};

export const deleteGrocery: MutationResolvers['deleteGrocery'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.grocery.findFirstOrThrow({ where: { userId, id } });

  return db.grocery.delete({ where: { id } });
};
