import type { QueryResolvers, MutationResolvers, ShoppingListRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { getAccessibleId, getAccessibleIds } from 'src/helpers/getAccessibleIds';

export const shoppingLists: QueryResolvers['shoppingLists'] = async (_, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleIds = await getAccessibleIds({ type: "ShoppingList", userId })

  const res = await db.shoppingList.findMany({
    include: {
      ShoppingListItem: true,
    },
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

  return res.map(async (row) => {
    return { ...row, shoppingListItems: await getShoppingListItems(row.id) }
  })
};

export const shoppingList: QueryResolvers['shoppingList'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = await getAccessibleId({ id, type: "ShoppingList", userId })

  const res = await db.shoppingList.findFirst({
    include: {
      ShoppingListItem: true,
    },
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    },
  });

  return { ...res, shoppingListItems: await getShoppingListItems(res.id) }
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

const getShoppingListItems = async (id: number) => {
  const [pending, bought] = await Promise.all([
    db.shoppingListItem.findMany({
      where: {
        shoppingListId: id,
        bought: false,
      },
      orderBy: {
        id: 'asc'
      }
    }),
    db.shoppingListItem.findMany({
      where: {
        shoppingListId: id,
        bought: true,
      },
      orderBy: {
        id: 'asc'
      }
    }),
  ]);

  return { pending, bought };
}

export const ShoppingList: ShoppingListRelationResolvers = {
  shoppingListItems: async (_obj, { root }) => {
    return getShoppingListItems(root.id)
  }
};
