import type { MutationResolvers, QueryResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

const getMaxAllowedDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return date;
};

export const groceries: QueryResolvers['groceries'] = async (_, { context }) => {
  const userId = context.currentUser['id'];

  const res = await db.grocery.findMany({
    where: { userId },
    orderBy: { expireAt: 'asc' },
  });

  return res.map((grocery) => ({
    ...grocery,
    nearExpireDate: grocery.expireAt <= getMaxAllowedDate(),
  }));
};

export const grocery: QueryResolvers['grocery'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  const res = await db.grocery.findFirst({
    where: { id, userId },
  });
  if (!res) throw new Error('Not found');

  return {
    ...res,
    nearExpireDate: res.expireAt <= getMaxAllowedDate(),
  };
};

export const createGrocery: MutationResolvers['createGrocery'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  const res = await db.grocery.create({
    data: { ...input, userId },
  });

  return {
    ...res,
    nearExpireDate: res.expireAt <= getMaxAllowedDate(),
  };
};

export const updateGrocery: MutationResolvers['updateGrocery'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.grocery.findFirstOrThrow({ where: { userId, id } });

  const res = await db.grocery.update({ data: input, where: { id } });

  return {
    ...res,
    nearExpireDate: res.expireAt <= getMaxAllowedDate(),
  };
};

export const deleteGrocery: MutationResolvers['deleteGrocery'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.grocery.findFirstOrThrow({ where: { userId, id } });

  const res = await db.grocery.delete({ where: { id } });

  return { ...res, nearExpireDate: false };
};

export const groceriesExpireCount: QueryResolvers['groceriesExpireCount'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.grocery.count({
    where: { userId, expireAt: { lte: getMaxAllowedDate() } },
  });
};
