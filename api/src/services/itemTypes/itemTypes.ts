import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const itemTypes: QueryResolvers['itemTypes'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.itemType.findMany({
    where: { userId },
  });
};

export const itemType: QueryResolvers['itemType'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.itemType.findFirst({
    where: { id, userId },
  });
};

export const createItemType: MutationResolvers['createItemType'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.itemType.create({
    data: { ...input, userId },
  });
};

export const updateItemType: MutationResolvers['updateItemType'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.itemType.findFirstOrThrow({ where: { userId, id } });

  return db.itemType.update({ data: input, where: { id } });
};

export const deleteItemType: MutationResolvers['deleteItemType'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.itemType.findFirstOrThrow({ where: { userId, id } });

  return db.itemType.delete({ where: { id } });
};
