import type { DeleteColorMutationVariables, FindColorById } from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_COLOR_MUTATION = gql`
  mutation DeleteColorMutation($id: Int!) {
    deleteColor(id: $id) {
      id
    }
  }
`;

interface Props {
  color: NonNullable<FindColorById['color']>;
}

const Color = ({ color }: Props) => {
  const [deleteColor] = useMutation(DELETE_COLOR_MUTATION, {
    onCompleted: () => {
      toast.success('Color deleted');
      navigate(routes.colors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteColorMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete color ' + id + '?')) {
      deleteColor({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Color {color.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{color.id}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{color.color}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editColor({ id: color.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(color.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Color;
