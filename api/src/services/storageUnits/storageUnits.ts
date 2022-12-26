import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const storageUnits: QueryResolvers['storageUnits'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.storageUnit.findMany({
    where: { userId },
  });
};

export const storageUnit: QueryResolvers['storageUnit'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.storageUnit.findFirst({
    where: { id, userId },
  });
};

export const createStorageUnit: MutationResolvers['createStorageUnit'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.storageUnit.create({
    data: { ...input, userId },
  });
};

export const updateStorageUnit: MutationResolvers['updateStorageUnit'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.storageUnit.findFirstOrThrow({ where: { userId, id } });

  return db.storageUnit.update({ data: input, where: { id } });
};

export const deleteStorageUnit: MutationResolvers['deleteStorageUnit'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.storageUnit.findFirstOrThrow({ where: { userId, id } });

  return db.storageUnit.delete({ where: { id } });
};
