import EditGroceryCell from 'src/components/Grocery/EditGroceryCell';

type GroceryPageProps = {
  id: number;
};

const EditGroceryPage = ({ id }: GroceryPageProps) => {
  return <EditGroceryCell id={id} />;
};

export default EditGroceryPage;
