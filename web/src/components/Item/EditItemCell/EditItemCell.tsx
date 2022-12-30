import type { EditItemById, UpdateItemInput } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ItemForm from 'src/components/Item/ItemForm';
import { useContext, useState } from 'react';
import WebCamForm from '../WebCamForm/WebCamForm';
import { FileStackContext } from 'src/contexts/FileStackContext';

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

export const UPDATE_ITEM_MUTATION = gql`
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
  const { fileStackClient } = useContext(FileStackContext);
  const [imageData, setImageData] = useState(null);

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = async (input: UpdateItemInput, id: EditItemById['item']['id']) => {
    if (imageData) {
      const imageFilename = `${id}.${process.env.IMAGE_FORMAT}`;
      const upload = await fileStackClient.upload(imageData, {}, { filename: imageFilename }, {});
      const imageHandle = upload.handle;
      const imageUrl = `${process.env.FILESTACK_HOST}/${imageHandle}`;
      input.imageUrl = imageUrl;
      input.imageHandle = imageHandle;
      input.imageFilename = imageFilename;
    }
    updateItem({ variables: { id, input } });
  };

  return (
    <>
      <WebCamForm imageData={imageData} setImageData={setImageData} />
      <ItemForm item={item} onSave={onSave} error={error} loading={loading} />
    </>
  );
};
