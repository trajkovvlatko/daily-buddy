import type { QueryResolvers, MutationResolvers, ItemRelationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const items: QueryResolvers['items'] = ({ drawerId }, { context }) => {
  const userId = context.currentUser['id'];

  return db.item.findMany({
    where: { userId, drawerId },
  });
};

export const item: QueryResolvers['item'] = ({ id }) => {
  const userId = context.currentUser['id'];

  return db.item.findFirst({
    where: { id, userId },
  });
};

export const createItem: MutationResolvers['createItem'] = ({ input }) => {
  const userId = context.currentUser['id'];

  return db.item.create({
    data: { ...input, userId },
  });
};

export const updateItem: MutationResolvers['updateItem'] = async ({ id, input }) => {
  const userId = context.currentUser['id'];
  await db.item.findFirstOrThrow({ where: { userId, id } });

  return db.item.update({ data: input, where: { id } });
};

export const deleteItem: MutationResolvers['deleteItem'] = async ({ id }) => {
  const userId = context.currentUser['id'];
  await db.item.findFirstOrThrow({ where: { userId, id } });

  return db.item.delete({ where: { id } });
};

export const Item: ItemRelationResolvers = {
  Color: (_obj, { root }) => {
    return db.item.findUnique({ where: { id: root?.id } }).Color();
  },
  ItemType: (_obj, { root }) => {
    return db.item.findUnique({ where: { id: root?.id } }).ItemType();
  },
};
