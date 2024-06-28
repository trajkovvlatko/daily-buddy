import type { FindShoppingLists } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import { truncate } from 'src/lib/formatters';

const ShoppingListsList = ({ shoppingLists }: FindShoppingLists) => {
  return (
    <div className="clear-both grid-cols-4 justify-between gap-4 md:grid">
      {shoppingLists.map((shoppingList) =>
        shoppingList.shoppingListItems.pending.length === 0 ? (
          <div key={shoppingList.id} className="mb-6 bg-white p-3 md:mb-0 md:h-96">
            <Link
              to={routes.shoppingList({ id: shoppingList.id })}
              title={'Show shoppingList ' + shoppingList.id + ' detail'}
              className="max-h-full md:mb-6"
            >
              <h2 className="mb-6 text-lg font-semibold">{truncate(shoppingList.name)}</h2>
              <div>No items.</div>
            </Link>
          </div>
        ) : (
          <div key={shoppingList.id} className="mb-6 max-h-80 bg-white p-3 md:mb-0 md:h-96 md:max-h-96">
            <Link
              to={routes.shoppingList({ id: shoppingList.id })}
              title={'Show shoppingList ' + shoppingList.id + ' detail'}
              className="max-h-full md:mb-6"
            >
              <h2 className="mb-6 text-lg font-semibold">{truncate(shoppingList.name)}</h2>

              <ul className="max-h-60 overflow-y-auto md:max-h-[85%]">
                {shoppingList.shoppingListItems.pending.map((shoppingListItem) => {
                  return (
                    <li key={shoppingListItem.id} className="pb-3 pl-3">
                      {' '}
                      - {shoppingListItem.name}
                    </li>
                  );
                })}
              </ul>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default ShoppingListsList;
