import { Link, routes } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';

import type { FindShoppingLists } from 'types/graphql';

const ShoppingListsList = ({ shoppingLists }: FindShoppingLists) => {
  return (
    <div className='clear-both flex flex-wrap	lg:flex-row flex-col'>
      {shoppingLists.map((shoppingList) => (
        <div key={shoppingList.id} className='flex flex-col mb-6 md:w-1/5'>
          <Link
            to={routes.shoppingList({ id: shoppingList.id })}
            title={'Show shoppingList ' + shoppingList.id + ' detail'}
            className="mb-6"
          >
            <strong>{truncate(shoppingList.name)}</strong>
          </Link>

          <div className='md:mr-6 mb-6 overflow-y-auto max-h-[60vh]'>
            {shoppingList.shoppingListItems.pending.map((shoppingListItem) => {
              return <div key={shoppingListItem.id}>{shoppingListItem.name}</div>
            })}
            {shoppingList.shoppingListItems.pending.length === 0 && <div>No items.</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingListsList;
