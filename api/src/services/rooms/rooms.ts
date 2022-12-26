import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const rooms: QueryResolvers['rooms'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.room.findMany({
    where: { userId },
  });
};

export const room: QueryResolvers['room'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.room.findFirst({
    where: { id, userId },
  });
};

export const createRoom: MutationResolvers['createRoom'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.room.create({
    data: { ...input, userId },
  });
};

export const updateRoom: MutationResolvers['updateRoom'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.room.findFirstOrThrow({ where: { userId, id } });

  return db.room.update({ data: input, where: { id } });
};

export const deleteRoom: MutationResolvers['deleteRoom'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.room.findFirstOrThrow({ where: { userId, id } });

  return db.room.delete({ where: { id } });
};
