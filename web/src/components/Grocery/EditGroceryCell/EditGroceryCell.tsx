import type { EditGroceryById, UpdateGroceryInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import GroceryForm from 'src/components/Grocery/GroceryForm';

export const QUERY = gql`
  query EditGroceryById($id: Int!) {
    grocery: grocery(id: $id) {
      id
      name
      boughtAt
      expireAt
    }
  }
`;
const UPDATE_GROCERY_MUTATION = gql`
  mutation UpdateGroceryMutation($id: Int!, $input: UpdateGroceryInput!) {
    updateGrocery(id: $id, input: $input) {
      id
      name
      boughtAt
      expireAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ grocery }: CellSuccessProps<EditGroceryById>) => {
  const [updateGrocery, { loading, error }] = useMutation(UPDATE_GROCERY_MUTATION, {
    onCompleted: () => {
      toast.success('Grocery updated');
      navigate(routes.groceries());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateGroceryInput, id: EditGroceryById['grocery']['id']) => {
    updateGrocery({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Grocery {grocery?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <GroceryForm grocery={grocery} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
