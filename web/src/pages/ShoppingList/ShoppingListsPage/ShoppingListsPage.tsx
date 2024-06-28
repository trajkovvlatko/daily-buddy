import { Link, routes } from '@redwoodjs/router';

import ShoppingListsCell from 'src/components/ShoppingList/ShoppingListsCell';

const ShoppingListsPage = () => {
  return (
    <div className="col-span-12 min-h-[calc(100vh-74px)] md:p-6">
      <Link to={routes.newShoppingList()} className="green-button float-right mb-3 mr-3 flex pl-6 pr-6 md:mr-0">
        <div className="rw-button-icon">+</div> New shopping list
      </Link>
      <ShoppingListsCell />
    </div>
  );
};

export default ShoppingListsPage;
