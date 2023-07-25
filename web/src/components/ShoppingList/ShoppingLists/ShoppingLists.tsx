import { Link, routes } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';

import type { FindShoppingLists } from 'types/graphql';

const ShoppingListsList = ({ shoppingLists }: FindShoppingLists) => {
  return (
    <div className='clear-both md:grid grid-cols-4 gap-4 justify-between'>
      {shoppingLists.map((shoppingList) => (
        shoppingList.shoppingListItems.pending.length === 0 ? (
          <div key={shoppingList.id} className='mb-6 md:mb-0 bg-white p-3 md:h-96'>
            <Link
              to={routes.shoppingList({ id: shoppingList.id })}
              title={'Show shoppingList ' + shoppingList.id + ' detail'}
              className="md:mb-6 max-h-full"
            >
              <h2 className="mb-6 text-lg font-semibold">{truncate(shoppingList.name)}</h2>
              <div>No items.</div>
            </Link>
          </div>
        ) : (
          <div key={shoppingList.id} className='mb-6 md:mb-0 bg-white p-3 max-h-80 md:max-h-96 md:h-96'>
            <Link
              to={routes.shoppingList({ id: shoppingList.id })}
              title={'Show shoppingList ' + shoppingList.id + ' detail'}
              className="md:mb-6 max-h-full"
            >
              <h2 className="mb-6 text-lg font-semibold">{truncate(shoppingList.name)}</h2>

              <ul className='overflow-y-auto max-h-60 md:max-h-[85%]'>
                {shoppingList.shoppingListItems.pending.map((shoppingListItem) => {
                  return <li key={shoppingListItem.id} className='pl-3 pb-3'> - {shoppingListItem.name}</li>
                })}
              </ul>
            </Link>
          </div>)
      ))}
    </div>
  );
};

export default ShoppingListsList;
