import type { QueryResolvers, MutationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const colors: QueryResolvers['colors'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.color.findMany({
    where: { userId },
  });
};

export const color: QueryResolvers['color'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.color.findFirst({
    where: { id, userId },
  });
};

export const createColor: MutationResolvers['createColor'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.color.create({
    data: { ...input, userId },
  });
};

export const updateColor: MutationResolvers['updateColor'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.color.findFirstOrThrow({ where: { userId, id } });

  return db.color.update({ data: input, where: { id } });
};

export const deleteColor: MutationResolvers['deleteColor'] = async ({ id }) => {
  const userId = context.currentUser['id'];
  await db.color.findFirstOrThrow({ where: { userId, id } });

  return db.color.delete({ where: { id } });
};
