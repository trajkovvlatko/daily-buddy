import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import StorageUnitForm from 'src/components/StorageUnit/StorageUnitForm';

import type { CreateStorageUnitInput } from 'types/graphql';

const CREATE_STORAGE_UNIT_MUTATION = gql`
  mutation CreateStorageUnitMutation($input: CreateStorageUnitInput!) {
    createStorageUnit(input: $input) {
      id
    }
  }
`;

const NewStorageUnit = () => {
  const [createStorageUnit, { loading, error }] = useMutation(CREATE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit created');
      navigate(routes.storageUnits());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateStorageUnitInput) => {
    createStorageUnit({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New StorageUnit</h2>
      </header>
      <div className="rw-segment-main">
        <StorageUnitForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewStorageUnit;
