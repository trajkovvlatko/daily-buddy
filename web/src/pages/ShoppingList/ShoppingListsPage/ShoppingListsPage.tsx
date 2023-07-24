import { Link, routes } from '@redwoodjs/router';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import ShoppingListsCell from 'src/components/ShoppingList/ShoppingListsCell';

const ShoppingListsPage = () => {
  return <PageWrapper>
    <div className='col-span-12 p-6'>
      <Link to={routes.newShoppingList()} className="green-button flex float-right mb-6 pl-6 pr-6">
        <div className="rw-button-icon">+</div> New shopping list
      </Link>
      <ShoppingListsCell />
    </div>
  </PageWrapper>;
};

export default ShoppingListsPage;
