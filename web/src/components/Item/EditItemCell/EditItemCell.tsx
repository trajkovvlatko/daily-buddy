import type { EditItemById, UpdateItemInput } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ItemForm from 'src/components/Item/ItemForm';
import { back } from '@redwoodjs/router';

export const QUERY = gql`
  query EditItemById($id: Int!) {
    item: item(id: $id) {
      id
      name
      colorId
      itemTypeId
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($id: Int!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      colorId
      itemTypeId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ item }: CellSuccessProps<EditItemById>) => {
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item updated');
      back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateItemInput, id: EditItemById['item']['id']) => {
    updateItem({ variables: { id, input } });
  };

  return <ItemForm item={item} onSave={onSave} error={error} loading={loading} />;
};
