import type { QueryResolvers, MutationResolvers, NoteTree } from 'types/graphql';
import { db } from 'src/lib/db';

export const notes: QueryResolvers['notes'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.$queryRaw<NoteTree[]>`
    WITH RECURSIVE tree_path (id, parentId, path) AS
    (
      SELECT id, parentId, CONCAT(title, '/') as path
        FROM Note
        WHERE parentId = 0 AND userId = ${userId}
      UNION ALL
      SELECT t.id, t.parentId, CONCAT(tp.path, t.title, '/')
        FROM tree_path AS tp JOIN Note AS t
          ON tp.id = t.parentId
    )
    SELECT * FROM tree_path
    ORDER BY path; 
  `;
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
