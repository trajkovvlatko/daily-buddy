import { useContext, useState } from 'react';

import type { EditItemById, UpdateItemInput } from 'types/graphql';

import { back } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ItemForm from 'src/components/Item/ItemForm';
import { FileStackContext } from 'src/contexts/FileStackContext';

import FileUploadForm from '../FileUploadForm/FileUploadForm';
import WebCamForm from '../WebCamForm/WebCamForm';

export const QUERY = gql`
  query EditItemById($id: Int!) {
    item: item(id: $id) {
      id
      name
      colorId
      itemTypeId
      imageHandle
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
  const [uploader, setUploader] = useState<'camera' | 'file'>('camera');
  const { fileStackClient } = useContext(FileStackContext);
  const url = item.imageHandle ? `${process.env.FILESTACK_HOST}/${item.imageHandle}` : null;
  const [imageRecord, setImageRecord] = useState<any>();
  const [imageData, setImageData] = useState(url);

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = async (input: UpdateItemInput, id: EditItemById['item']['id']) => {
    const imageFilename = `${id}.${process.env.IMAGE_FORMAT}`;
    let imageHandle: string;

    if (imageData && uploader === 'camera') {
      const upload = await fileStackClient.upload(imageData, {}, { filename: imageFilename }, {});
      imageHandle = upload.handle;
    } else if (imageRecord && uploader === 'file') {
      imageHandle = imageRecord.handle;
    }

    const imageUrl = `${process.env.FILESTACK_HOST}/${imageHandle}`;
    input.imageUrl = imageUrl;
    input.imageHandle = imageHandle;
    input.imageFilename = imageFilename;

    await updateItem({ variables: { id, input } });
    back();
  };

  const toggleUploader = () => setUploader(uploader === 'camera' ? 'file' : 'camera');

  return (
    <>
      <button className="orange-button" onClick={toggleUploader}>
        Toggle uploader
      </button>
      {uploader === 'camera' ? (
        <WebCamForm imageData={imageData} setImageData={setImageData} />
      ) : (
        <FileUploadForm imageRecord={imageRecord} setImageRecord={setImageRecord} />
      )}
      <ItemForm item={item} onSave={onSave} error={error} loading={loading} />
    </>
  );
};
