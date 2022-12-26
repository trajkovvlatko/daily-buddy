import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import DrawerForm from 'src/components/Drawer/DrawerForm';

import type { CreateDrawerInput } from 'types/graphql';

const CREATE_DRAWER_MUTATION = gql`
  mutation CreateDrawerMutation($input: CreateDrawerInput!) {
    createDrawer(input: $input) {
      id
    }
  }
`;

const NewDrawer = () => {
  const [createDrawer, { loading, error }] = useMutation(CREATE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer created');
      navigate(routes.drawers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateDrawerInput) => {
    createDrawer({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Drawer</h2>
      </header>
      <div className="rw-segment-main">
        <DrawerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewDrawer;
