import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import ShoppingListCell from 'src/components/ShoppingList/ShoppingListCell';

type ShoppingListPageProps = {
  id: number;
};

const ShoppingListPage = ({ id }: ShoppingListPageProps) => {
  return <PageWrapper>
    <div className='col-span-12 pl-6'>
      <ShoppingListCell id={id} />
    </div>
  </PageWrapper>
};

export default ShoppingListPage;
