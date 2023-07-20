import type { MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

const getRecord = async ({ id, type, userId }: { id: number, type: string, userId: number }) => {
  switch (type) {
    case "Note":
      return db.note.findFirst({
        where: {
          userId,
          id
        }
      })
    default:
      return null;
  }


}

export const access: MutationResolvers['access'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];
  const { id, type, emails } = input

  const record = await getRecord({ id, type, userId })
  if (!record) return false

  const users = await db.user.findMany({
    select: {
      id: true
    },
    where: {
      email: {
        in: emails
      }
    }
  })

  await db.access.deleteMany({
    where: {
      accessibleId: id,
      accessibleType: type as any,
    }
  })
  const userIds = users.map((user) => user.id)
  await Promise.all(userIds.map((userId) => {
    return db.access.create({
      data: {
        userId,
        accessibleId: id,
        accessibleType: type as any,
      }
    })
  }))

  return true
};
