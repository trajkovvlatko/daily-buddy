import { Link, routes } from '@redwoodjs/router';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import ShoppingListsCell from 'src/components/ShoppingList/ShoppingListsCell';

const ShoppingListsPage = () => {
  return <PageWrapper>
    <div className='col-span-12 p-6'>
      <Link to={routes.newShoppingList()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New shopping list
      </Link>
      <ShoppingListsCell />
    </div>
  </PageWrapper>;
};

export default ShoppingListsPage;
