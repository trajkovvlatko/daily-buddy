import type { CreateDrawerInput } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import DrawerForm from 'src/components/Drawer/DrawerForm';

const CREATE_DRAWER_MUTATION = gql`
  mutation CreateDrawerMutation($input: CreateDrawerInput!) {
    createDrawer(input: $input) {
      id
    }
  }
`;

const NewDrawer = ({ storageUnitId, callback }: { storageUnitId: number; callback: () => void }) => {
  const [createDrawer, { loading, error }] = useMutation(CREATE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer created');
      callback();
    },
    refetchQueries: ['FindDrawers'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateDrawerInput) => {
    createDrawer({ variables: { input } });
  };

  return <DrawerForm onSave={onSave} loading={loading} error={error} storageUnitId={storageUnitId} />;
};

export default NewDrawer;
