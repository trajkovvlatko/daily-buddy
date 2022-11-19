import type { QueryResolvers, MutationResolvers, NoteTree } from 'types/graphql';
import { db } from 'src/lib/db';

export const notes: QueryResolvers['notes'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.note.findMany({
    where: { userId },
    orderBy: { path: 'asc' },
  });
};

export const note: QueryResolvers['note'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.note.findFirst({
    where: { id, userId },
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
  await db.note.findFirstOrThrow({ where: { userId, id } });

  return db.note.update({ data: input, where: { id } });
};

export const deleteNote: MutationResolvers['deleteNote'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.note.findFirstOrThrow({ where: { userId, id } });

  return db.note.delete({ where: { id } });
};
