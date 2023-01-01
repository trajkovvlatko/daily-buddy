import type { EditDrawerById, UpdateDrawerInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import DrawerForm from 'src/components/Drawer/DrawerForm';

export const QUERY = gql`
  query EditDrawerById($id: Int!) {
    drawer: drawer(id: $id) {
      id
      level
      note
      storageUnitId
    }
  }
`;
const UPDATE_DRAWER_MUTATION = gql`
  mutation UpdateDrawerMutation($id: Int!, $input: UpdateDrawerInput!) {
    updateDrawer(id: $id, input: $input) {
      id
      level
      note
      storageUnitId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ drawer }: CellSuccessProps<EditDrawerById>) => {
  const [updateDrawer, { loading, error }] = useMutation(UPDATE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer updated');
      navigate(routes.drawers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateDrawerInput, id: EditDrawerById['drawer']['id']) => {
    updateDrawer({ variables: { id, input } });
  };

  return (
    <div>
      <h2 className="h2">Edit Drawer {drawer?.note}</h2>
      <div className="px-6">
        <DrawerForm drawer={drawer} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
