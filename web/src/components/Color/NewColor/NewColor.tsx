import type { CreateColorInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ColorForm from 'src/components/Color/ColorForm';

const CREATE_COLOR_MUTATION = gql`
  mutation CreateColorMutation($input: CreateColorInput!) {
    createColor(input: $input) {
      id
    }
  }
`;

const NewColor = () => {
  const [createColor, { loading, error }] = useMutation(CREATE_COLOR_MUTATION, {
    onCompleted: () => {
      toast.success('Color created');
      navigate(routes.colors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateColorInput) => {
    createColor({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Color</h2>
      </header>
      <div className="rw-segment-main">
        <ColorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewColor;
