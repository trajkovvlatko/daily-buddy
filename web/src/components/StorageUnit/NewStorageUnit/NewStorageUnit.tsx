import type { CreateStorageUnitInput } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import StorageUnitForm from 'src/components/StorageUnit/StorageUnitForm';

const CREATE_STORAGE_UNIT_MUTATION = gql`
  mutation CreateStorageUnitMutation($input: CreateStorageUnitInput!) {
    createStorageUnit(input: $input) {
      id
    }
  }
`;

const NewStorageUnit = ({ roomId, callback }: { roomId: number; callback: () => void }) => {
  const [createStorageUnit, { loading, error }] = useMutation(CREATE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit created');
      callback();
    },
    refetchQueries: ['FindStorageUnits'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateStorageUnitInput) => {
    createStorageUnit({ variables: { input } });
  };

  return <StorageUnitForm roomId={roomId} onSave={onSave} loading={loading} error={error} />;
};

export default NewStorageUnit;
