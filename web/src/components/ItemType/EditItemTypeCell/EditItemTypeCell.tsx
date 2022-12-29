import type { EditItemTypeById, UpdateItemTypeInput } from 'types/graphql';
import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ItemTypeForm from 'src/components/ItemType/ItemTypeForm';

export const QUERY = gql`
  query EditItemTypeById($id: Int!) {
    itemType: itemType(id: $id) {
      id
      itemType
    }
  }
`;
const UPDATE_ITEM_TYPE_MUTATION = gql`
  mutation UpdateItemTypeMutation($id: Int!, $input: UpdateItemTypeInput!) {
    updateItemType(id: $id, input: $input) {
      id
      itemType
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ itemType }: CellSuccessProps<EditItemTypeById>) => {
  const [updateItemType, { loading, error }] = useMutation(UPDATE_ITEM_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('ItemType updated');
      navigate(routes.itemTypes());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateItemTypeInput, id: EditItemTypeById['itemType']['id']) => {
    updateItemType({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit ItemType {itemType?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ItemTypeForm itemType={itemType} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
