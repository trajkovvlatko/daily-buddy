import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const journals: QueryResolvers['journals'] = ({ limit = 30, order = 'DESC' }, { context }) => {
  const userId = context.currentUser['id'];

  return db.journal.findMany({
    where: { userId },
    orderBy: {
      forDate: order === 'ASC' ? 'asc' : 'desc',
    },
    take: limit,
  });
};

export const journal: QueryResolvers['journal'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.journal.findFirst({
    where: { id, userId },
  });
};

export const createJournal: MutationResolvers['createJournal'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.journal.create({
    data: { ...input, userId },
  });
};

export const updateJournal: MutationResolvers['updateJournal'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.journal.findFirstOrThrow({ where: { userId, id } });

  return db.journal.update({ data: input, where: { id } });
};

export const deleteJournal: MutationResolvers['deleteJournal'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.journal.findFirstOrThrow({ where: { userId, id } });

  return db.journal.delete({ where: { id } });
};

export const journalByDate: QueryResolvers['journalByDate'] = ({ date }, { context }) => {
  const userId = context.currentUser['id'];

  return db.journal.findFirst({
    where: { forDate: date, userId },
  });
};
