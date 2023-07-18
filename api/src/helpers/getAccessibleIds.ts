import { db } from 'src/lib/db';

export const getAccessibleIds = async ({ type, userId }: { type: "Note", userId: number }): Promise<number[]> => {
  const accesses = await db.access.findMany({
    select: {
      accessibleId: true
    },
    where: {
      accessibleType: type,
      userId,
    } as unknown
  })

  return accesses.map((row) => row.accessibleId);
}

export const getAccessibleId = async ({ id, type, userId }: { id: number, type: "Note", userId: number }): Promise<number | undefined> => {
  const accesses = await db.access.findMany({
    select: {
      accessibleId: true
    },
    where: {
      accessibleId: id,
      accessibleType: type,
      userId,
    } as unknown
  })

  return accesses[0]?.accessibleId
}
