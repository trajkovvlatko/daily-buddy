import type { QueryResolvers, MutationResolvers, JournalRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const journals: QueryResolvers['journals'] = () => {
  return db.journal.findMany();
};

export const journal: QueryResolvers['journal'] = ({ id }) => {
  return db.journal.findUnique({
    where: { id },
  });
};

export const createJournal: MutationResolvers['createJournal'] = ({ input }) => {
  return db.journal.create({
    data: input,
  });
};

export const updateJournal: MutationResolvers['updateJournal'] = ({ id, input }) => {
  return db.journal.update({
    data: input,
    where: { id },
  });
};

export const deleteJournal: MutationResolvers['deleteJournal'] = ({ id }) => {
  return db.journal.delete({
    where: { id },
  });
};

export const Journal: JournalRelationResolvers = {
  User: (_obj, { root }) => {
    return db.journal.findUnique({ where: { id: root?.id } }).User();
  },
};
