import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const callLogs: QueryResolvers['callLogs'] = ({ personId }, { context }) => {
  const userId = context.currentUser['id'];

  return db.callLog.findMany({
    where: { userId, personId },
    orderBy: { id: 'desc' },
  });
};

export const callLog: QueryResolvers['callLog'] = ({ id, personId }, { context }) => {
  const userId = context.currentUser['id'];

  return db.callLog.findFirst({
    where: { id, personId, userId },
  });
};

export const createCallLog: MutationResolvers['createCallLog'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.callLog.create({
    data: { ...input, userId },
  });
};

export const updateCallLog: MutationResolvers['updateCallLog'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.callLog.findFirstOrThrow({ where: { userId, id } });

  return db.callLog.update({ data: input, where: { id } });
};

export const deleteCallLog: MutationResolvers['deleteCallLog'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.callLog.findFirstOrThrow({ where: { userId, id } });

  return db.callLog.delete({ where: { id } });
};
