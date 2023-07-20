import { Link, routes } from '@redwoodjs/router';
import ShoppingListsCell from 'src/components/ShoppingList/ShoppingListsCell';

const ShoppingListsPage = () => {
  return <div>
    <Link to={routes.newShoppingList()} className="rw-button rw-button-green float-right mb-6 w-64">
      <div className="rw-button-icon">+</div> New shopping list
    </Link>
    <ShoppingListsCell />
  </div>;
};

export default ShoppingListsPage;
