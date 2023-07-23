import { getAccessibleIds } from "src/helpers/getAccessibleIds";
import { db } from "src/lib/db";
import { MutationResolvers } from "types/graphql";

const validateAccess = async ({ userId, shoppingListId }: { userId: number; shoppingListId: number }) => {
  const accessibleId = (await getAccessibleIds({ type: "ShoppingList", userId })).find((row) => row === shoppingListId)

  // Check if user has access to the whole shopping list
  await db.shoppingList.findFirstOrThrow({
    where: {
      OR: [
        { id: shoppingListId, userId },
        { id: accessibleId }
      ]
    }
  })
}

export const updateShoppingListItem: MutationResolvers['updateShoppingListItem'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await validateAccess({ userId, shoppingListId: input.shoppingListId })

  return db.shoppingListItem.update({ data: input, where: { id } });
};


export const createShoppingListItem: MutationResolvers['createShoppingListItem'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];
  await validateAccess({ userId, shoppingListId: input.shoppingListId })

  return db.shoppingListItem.create({ data: input });
};
