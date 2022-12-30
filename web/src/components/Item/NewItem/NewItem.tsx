import { navigate, routes, useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ItemForm from 'src/components/Item/ItemForm';
import { useCallback, useContext, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FileStackContext } from 'src/contexts/FileStackContext';
import type { CreateItemInput } from 'types/graphql';

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
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

const NewItem = ({ drawerId }: { drawerId: number; callback: () => void }) => {
  const params = useParams();
  const fileStackContext = useContext(FileStackContext);
  const { fileStackClient } = fileStackContext;
  const [imageData, setImageData] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    setImageData(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const retake = () => setImageData(null);

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
    const upload = await fileStackClient.upload(imageData, {}, { filename: imageFilename }, {});
    const imageHandle = upload.handle;
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

  return (
    <>
      <>
        <Webcam
          width={720}
          height={480}
          ref={webcamRef}
          videoConstraints={{
            width: { min: 720 },
            height: { min: 480 },
            facingMode: 'user',
          }}
          screenshotFormat="image/png"
        />
        <button onClick={capture}>Capture photo</button>
      </>

      <>
        <img src={imageData} />
        <button onClick={retake}>Retake</button>
      </>
      <ItemForm onSave={onSave} loading={loading} error={error} drawerId={drawerId} />
    </>
  );
};

export default NewItem;
