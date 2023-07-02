import type { CreateGroceryInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import GroceryForm from 'src/components/Grocery/GroceryForm';

const CREATE_GROCERY_MUTATION = gql`
  mutation CreateGroceryMutation($input: CreateGroceryInput!) {
    createGrocery(input: $input) {
      id
    }
  }
`;

const NewGrocery = () => {
  const [createGrocery, { loading, error }] = useMutation(CREATE_GROCERY_MUTATION, {
    onCompleted: () => {
      toast.success('Grocery created');
      navigate(routes.groceries());
    },
    refetchQueries: ['FindGroceries'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = async (input: CreateGroceryInput) => {
    createGrocery({ variables: { input } });
  };

  return (
    <div className="bg-white p-3">
      <h2 className="h-12 text-lg font-semibold">Add groceries</h2>
      <div>
        <GroceryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewGrocery;
