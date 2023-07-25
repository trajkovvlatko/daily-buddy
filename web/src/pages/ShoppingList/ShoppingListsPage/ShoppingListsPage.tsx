import { Link, routes } from '@redwoodjs/router';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import ShoppingListsCell from 'src/components/ShoppingList/ShoppingListsCell';

const ShoppingListsPage = () => {
  return <div className='col-span-12 md:p-6 min-h-[calc(100vh-74px)]'>
    <Link to={routes.newShoppingList()} className="green-button flex float-right mb-3 pl-6 pr-6 mr-3 md:mr-0">
      <div className="rw-button-icon">+</div> New shopping list
    </Link>
    <ShoppingListsCell />
  </div>
};

export default ShoppingListsPage;
