import { navigate, routes, useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ItemForm from 'src/components/Item/ItemForm';
import { useContext, useState } from 'react';
import { FileStackContext } from 'src/contexts/FileStackContext';
import type { CreateItemInput } from 'types/graphql';
import { UPDATE_ITEM_MUTATION } from '../EditItemCell';
import WebCamForm from '../WebCamForm/WebCamForm';
import FileUploadForm from '../FileUploadForm/FileUploadForm';

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`;

const NewItem = ({ drawerId }: { drawerId: number; callback: () => void }) => {
  const params = useParams();
  const { fileStackClient } = useContext(FileStackContext);
  const [imageData, setImageData] = useState(null);
  const [imageRecord, setImageRecord] = useState(null);
  const [uploader, setUploader] = useState<'camera' | 'file'>('camera');

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    refetchQueries: ['FindItems'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = async (input: CreateItemInput) => {
    const newRecord = (await createItem({ variables: { input } })).data.createItem;
    const imageFilename = `${newRecord.id}.${process.env.IMAGE_FORMAT}`;

    const uploadImageData = async () => {
      return (await fileStackClient.upload(imageData, {}, { filename: imageFilename }, {})).handle;
    };
    const getImageDetailsFromUpload = async () => imageRecord.handle;

    const imageHandle = await (uploader === 'camera' ? uploadImageData() : getImageDetailsFromUpload());
    const imageUrl = `${process.env.FILESTACK_HOST}/${imageHandle}`;

    await updateItem({
      variables: { id: newRecord.id, input: { imageFilename, imageHandle, imageUrl } },
    });

    navigate(
      routes.inventoryItem({
        roomId: parseInt(params.roomId),
        storageUnitId: parseInt(params.storageUnitId),
        drawerId: parseInt(params.drawerId),
        itemId: newRecord.id,
      })
    );
  };

  const toggleUploader = () => setUploader(uploader === 'camera' ? 'file' : 'camera');

  return (
    <div className="px-6 pb-6">
      <button className="orange-button" onClick={toggleUploader}>
        Toggle uploader
      </button>
      {uploader === 'camera' ? (
        <WebCamForm imageData={imageData} setImageData={setImageData} />
      ) : (
        <FileUploadForm imageRecord={imageRecord} setImageRecord={setImageRecord} />
      )}
      <ItemForm onSave={onSave} loading={loading} error={error} drawerId={drawerId} />
    </div>
  );
};

export default NewItem;
