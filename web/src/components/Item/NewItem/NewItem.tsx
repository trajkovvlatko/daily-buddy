import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ItemForm from 'src/components/Item/ItemForm';

import type { CreateItemInput } from 'types/graphql';

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`;

const NewItem = ({ drawerId, callback }: { drawerId: number; callback: () => void }) => {
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item created');
      callback();
    },
    refetchQueries: ['FindItems'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateItemInput) => {
    createItem({ variables: { input } });
  };

  return <ItemForm onSave={onSave} loading={loading} error={error} drawerId={drawerId} />;
};

export default NewItem;
