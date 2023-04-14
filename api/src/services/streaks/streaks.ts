import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const streaks: QueryResolvers['streaks'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.streak.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
};

export const streak: QueryResolvers['streak'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.streak.findFirst({
    where: { id, userId },
  });
};

export const createStreak: MutationResolvers['createStreak'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.streak.create({
    data: { ...input, userId },
  });
};

export const updateStreak: MutationResolvers['updateStreak'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.streak.findFirstOrThrow({ where: { userId, id } });

  return db.streak.update({ data: input, where: { id } });
};

export const deleteStreak: MutationResolvers['deleteStreak'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.streak.findFirstOrThrow({ where: { userId, id } });

  return db.streak.delete({ where: { id } });
};
