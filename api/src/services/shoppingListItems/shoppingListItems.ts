import { getAccessibleIds } from "src/helpers/getAccessibleIds";
import { db } from "src/lib/db";
import { MutationResolvers } from "types/graphql";

export const updateShoppingListItem: MutationResolvers['updateShoppingListItem'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  const accessibleId = (await getAccessibleIds({ type: "ShoppingList", userId })).find((row) => row === input.shoppingListId)

  // Check if user has access to the whole shopping list
  await db.shoppingList.findFirstOrThrow({
    where: {
      OR: [
        { id, userId },
        { id: accessibleId }
      ]
    }
  })

  return db.shoppingListItem.update({ data: input, where: { id } });
};
