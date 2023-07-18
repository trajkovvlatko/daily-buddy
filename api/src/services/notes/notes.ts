import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { getAccessibleIds, getAccessibleId } from 'src/helpers/getAccessibleIds';

export const notes: QueryResolvers['notes'] = async (_, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleIds = await getAccessibleIds({ type: "Note", userId })

  return db.note.findMany({
    where: {
      OR: [
        { userId },
        { id: { in: accessibleIds } }
      ]
    },
    orderBy: { path: 'asc' },
  });
};

export const note: QueryResolvers['note'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = await getAccessibleId({ id, type: "Note", userId })

  return db.note.findFirst({
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    },
  });
};

export const createNote: MutationResolvers['createNote'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.note.create({
    data: { ...input, userId },
  });
};

export const updateNote: MutationResolvers['updateNote'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = (await getAccessibleIds({ type: "Note", userId })).find((row) => row === id)
  await db.note.findFirstOrThrow({
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    }
  });

  return db.note.update({ data: input, where: { id } });
};

export const deleteNote: MutationResolvers['deleteNote'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.note.findFirstOrThrow({ where: { userId, id } });

  return db.note.delete({ where: { id } });
};
