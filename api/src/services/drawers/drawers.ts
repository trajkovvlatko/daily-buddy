import type { QueryResolvers, MutationResolvers, DrawerRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const drawers: QueryResolvers['drawers'] = () => {
  return db.drawer.findMany();
};

export const drawer: QueryResolvers['drawer'] = ({ id }) => {
  return db.drawer.findUnique({
    where: { id },
  });
};

export const createDrawer: MutationResolvers['createDrawer'] = ({ input }) => {
  return db.drawer.create({
    data: input,
  });
};

export const updateDrawer: MutationResolvers['updateDrawer'] = ({ id, input }) => {
  return db.drawer.update({
    data: input,
    where: { id },
  });
};

export const deleteDrawer: MutationResolvers['deleteDrawer'] = ({ id }) => {
  return db.drawer.delete({
    where: { id },
  });
};

export const Drawer: DrawerRelationResolvers = {
  StorageUnit: (_obj, { root }) => {
    return db.drawer.findUnique({ where: { id: root?.id } }).StorageUnit();
  },
  User: (_obj, { root }) => {
    return db.drawer.findUnique({ where: { id: root?.id } }).User();
  },
  Item: (_obj, { root }) => {
    return db.drawer.findUnique({ where: { id: root?.id } }).Item();
  },
};
