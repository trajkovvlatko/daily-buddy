import type { EditColorById, UpdateColorInput } from 'types/graphql';
import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import ColorForm from 'src/components/Color/ColorForm';

export const QUERY = gql`
  query EditColorById($id: Int!) {
    color: color(id: $id) {
      id
      color
    }
  }
`;
const UPDATE_COLOR_MUTATION = gql`
  mutation UpdateColorMutation($id: Int!, $input: UpdateColorInput!) {
    updateColor(id: $id, input: $input) {
      id
      color
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ color }: CellSuccessProps<EditColorById>) => {
  const [updateColor, { loading, error }] = useMutation(UPDATE_COLOR_MUTATION, {
    onCompleted: () => {
      toast.success('Color updated');
      navigate(routes.colors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateColorInput, id: EditColorById['color']['id']) => {
    updateColor({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Color {color?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ColorForm color={color} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
