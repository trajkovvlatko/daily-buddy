import type { QueryResolvers, MutationResolvers, ItemTypeRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const itemTypes: QueryResolvers['itemTypes'] = () => {
  return db.itemType.findMany();
};

export const itemType: QueryResolvers['itemType'] = ({ id }) => {
  return db.itemType.findUnique({
    where: { id },
  });
};

export const createItemType: MutationResolvers['createItemType'] = ({ input }) => {
  return db.itemType.create({
    data: input,
  });
};

export const updateItemType: MutationResolvers['updateItemType'] = ({ id, input }) => {
  return db.itemType.update({
    data: input,
    where: { id },
  });
};

export const deleteItemType: MutationResolvers['deleteItemType'] = ({ id }) => {
  return db.itemType.delete({
    where: { id },
  });
};

export const ItemType: ItemTypeRelationResolvers = {
  User: (_obj, { root }) => {
    return db.itemType.findUnique({ where: { id: root?.id } }).User();
  },
  Item: (_obj, { root }) => {
    return db.itemType.findUnique({ where: { id: root?.id } }).Item();
  },
};
