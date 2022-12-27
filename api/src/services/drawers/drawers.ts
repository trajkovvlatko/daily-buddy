import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const drawers: QueryResolvers['drawers'] = ({ storageUnitId }, { context }) => {
  const userId = context.currentUser['id'];

  return db.drawer.findMany({
    where: { userId, storageUnitId },
  });
};

export const drawer: QueryResolvers['drawer'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.drawer.findFirst({
    where: { id, userId },
  });
};

export const createDrawer: MutationResolvers['createDrawer'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.drawer.create({
    data: { ...input, userId },
  });
};

export const updateDrawer: MutationResolvers['updateDrawer'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.drawer.findFirstOrThrow({ where: { userId, id } });

  return db.drawer.update({ data: input, where: { id } });
};

export const deleteDrawer: MutationResolvers['deleteDrawer'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.drawer.findFirstOrThrow({ where: { userId, id } });

  return db.drawer.delete({ where: { id } });
};
