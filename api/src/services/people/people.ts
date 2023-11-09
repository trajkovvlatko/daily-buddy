import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const people: QueryResolvers['people'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.person.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
};

export const person: QueryResolvers['person'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.person.findFirst({
    where: { id, userId },
  });
};

export const createPerson: MutationResolvers['createPerson'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.person.create({
    data: { ...input, userId },
  });
};

export const updatePerson: MutationResolvers['updatePerson'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.person.findFirstOrThrow({ where: { userId, id } });

  return db.person.update({ data: input, where: { id } });
};

export const deletePerson: MutationResolvers['deletePerson'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.person.findFirstOrThrow({ where: { userId, id } });

  return db.person.delete({ where: { id } });
};
