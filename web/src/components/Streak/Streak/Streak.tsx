import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteStreakMutationVariables, FindStreakById } from 'types/graphql';

const DELETE_STREAK_MUTATION = gql`
  mutation DeleteStreakMutation($id: Int!) {
    deleteStreak(id: $id) {
      id
    }
  }
`;

interface Props {
  streak: NonNullable<FindStreakById['streak']>;
}

const Streak = ({ streak }: Props) => {
  const [deleteStreak] = useMutation(DELETE_STREAK_MUTATION, {
    onCompleted: () => {
      toast.success('Streak deleted');
      navigate(routes.streaks());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteStreakMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete streak ' + id + '?')) {
      deleteStreak({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Streak {streak.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{streak.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{streak.name}</td>
            </tr>
            <tr>
              <th>Last date</th>
              <td>{streak.last_date.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editStreak({ id: streak.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(streak.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Streak;
