import type { QueryResolvers, MutationResolvers, RoomRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const rooms: QueryResolvers['rooms'] = () => {
  return db.room.findMany();
};

export const room: QueryResolvers['room'] = ({ id }) => {
  return db.room.findUnique({
    where: { id },
  });
};

export const createRoom: MutationResolvers['createRoom'] = ({ input }) => {
  return db.room.create({
    data: input,
  });
};

export const updateRoom: MutationResolvers['updateRoom'] = ({ id, input }) => {
  return db.room.update({
    data: input,
    where: { id },
  });
};

export const deleteRoom: MutationResolvers['deleteRoom'] = ({ id }) => {
  return db.room.delete({
    where: { id },
  });
};

export const Room: RoomRelationResolvers = {
  User: (_obj, { root }) => {
    return db.room.findUnique({ where: { id: root?.id } }).User();
  },
  StorageUnit: (_obj, { root }) => {
    return db.room.findUnique({ where: { id: root?.id } }).StorageUnit();
  },
};
