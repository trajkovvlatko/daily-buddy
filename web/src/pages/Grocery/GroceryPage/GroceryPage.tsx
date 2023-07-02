import GroceryCell from 'src/components/Grocery/GroceryCell';

type GroceryPageProps = {
  id: number;
};

const GroceryPage = ({ id }: GroceryPageProps) => {
  return <GroceryCell id={id} />;
};

export default GroceryPage;
