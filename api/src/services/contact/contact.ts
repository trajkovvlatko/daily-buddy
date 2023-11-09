import NodeCache from 'node-cache';

import { db } from 'src/lib/db';

const cache = new NodeCache();

const CACHE_KEY = 'contact';
const CACHE_TTL = 24 * 60 * 60; // 24 hours

export const contact = async (_: any, { context }) => {
  const userId = context.currentUser['id'];

  const response = cache.get(`${CACHE_KEY}-${userId}`);
  if (response) return response;

  const id = await db.$queryRaw`SELECT id FROM Person WHERE userId = ${userId} ORDER BY RAND() LIMIT 1`;

  const data = await db.person.findFirst({
    select: { id: true, name: true },
    where: { id: id[0].id },
  });

  cache.set(`${CACHE_KEY}-${userId}`, data, CACHE_TTL);

  return data;
};
