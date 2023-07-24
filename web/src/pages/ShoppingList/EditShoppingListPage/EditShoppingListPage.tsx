import EditShoppingListCell from 'src/components/ShoppingList/EditShoppingListCell';

type ShoppingListPageProps = {
  id: number;
};

const EditShoppingListPage = ({ id }: ShoppingListPageProps) => {
  return <EditShoppingListCell id={id} />;
};

export default EditShoppingListPage;
