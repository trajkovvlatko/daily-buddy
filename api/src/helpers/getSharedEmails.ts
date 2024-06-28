import { db } from 'src/lib/db';

export const getSharedEmails = async ({ id, type }: { id: number; type: string }): Promise<string[]> => {
  const access = await db.access.findMany({
    where: {
      accessibleId: id,
      accessibleType: type as unknown,
    },
  });
  const userIds = access.map((row) => row.userId);
  const users = await db.user.findMany({
    select: {
      email: true,
    },
    where: {
      id: {
        in: userIds,
      },
    },
  });

  return users.map((row) => row.email);
};
