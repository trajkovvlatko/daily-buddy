import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { getAccessibleId, getAccessibleIds } from 'src/helpers/getAccessibleIds';

export const shoppingLists: QueryResolvers['shoppingLists'] = async (_, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleIds = await getAccessibleIds({ type: "ShoppingList", userId })

  return db.shoppingList.findMany({
    where: {
      OR: [
        { userId },
        {
          id: {
            in: accessibleIds
          }
        }
      ]
    },
    orderBy: { name: 'asc' },
  });
};

export const shoppingList: QueryResolvers['shoppingList'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = await getAccessibleId({ id, type: "ShoppingList", userId })

  return db.shoppingList.findFirst({
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    },
  });
};

export const createShoppingList: MutationResolvers['createShoppingList'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.shoppingList.create({
    data: { ...input, userId },
  });
};

export const updateShoppingList: MutationResolvers['updateShoppingList'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = (await getAccessibleIds({ type: "ShoppingList", userId })).find((row) => row === id)
  await db.shoppingList.findFirstOrThrow({
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    }
  })

  return db.shoppingList.update({ data: input, where: { id } });
};

export const deleteShoppingList: MutationResolvers['deleteShoppingList'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.shoppingList.findFirstOrThrow({ where: { userId, id } });

  return db.shoppingList.delete({ where: { id } });
};
