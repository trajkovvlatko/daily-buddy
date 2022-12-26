import type { QueryResolvers, MutationResolvers, StorageUnitRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const storageUnits: QueryResolvers['storageUnits'] = () => {
  return db.storageUnit.findMany();
};

export const storageUnit: QueryResolvers['storageUnit'] = ({ id }) => {
  return db.storageUnit.findUnique({
    where: { id },
  });
};

export const createStorageUnit: MutationResolvers['createStorageUnit'] = ({ input }) => {
  return db.storageUnit.create({
    data: input,
  });
};

export const updateStorageUnit: MutationResolvers['updateStorageUnit'] = ({ id, input }) => {
  return db.storageUnit.update({
    data: input,
    where: { id },
  });
};

export const deleteStorageUnit: MutationResolvers['deleteStorageUnit'] = ({ id }) => {
  return db.storageUnit.delete({
    where: { id },
  });
};

export const StorageUnit: StorageUnitRelationResolvers = {
  Room: (_obj, { root }) => {
    return db.storageUnit.findUnique({ where: { id: root?.id } }).Room();
  },
  User: (_obj, { root }) => {
    return db.storageUnit.findUnique({ where: { id: root?.id } }).User();
  },
  Drawer: (_obj, { root }) => {
    return db.storageUnit.findUnique({ where: { id: root?.id } }).Drawer();
  },
};
