import ShoppingListCell from 'src/components/ShoppingList/ShoppingListCell';

type ShoppingListPageProps = {
  id: number;
};

const ShoppingListPage = ({ id }: ShoppingListPageProps) => {
  return <ShoppingListCell id={id} />;
};

export default ShoppingListPage;
