import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Streak/StreaksCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type { DeleteStreakMutationVariables, FindStreaks } from 'types/graphql';

const DELETE_STREAK_MUTATION = gql`
  mutation DeleteStreakMutation($id: Int!) {
    deleteStreak(id: $id) {
      id
    }
  }
`;

const StreaksList = ({ streaks }: FindStreaks) => {
  const [deleteStreak] = useMutation(DELETE_STREAK_MUTATION, {
    onCompleted: () => {
      toast.success('Streak deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteStreakMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete streak ' + id + '?')) {
      deleteStreak({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <Link to={routes.newStreak()} className="rw-link">
        {'Create'}
      </Link>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Last date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {streaks.map((streak) => (
            <tr key={streak.id}>
              <td>{truncate(streak.id)}</td>
              <td>{truncate(streak.name)}</td>
              <td>{streak.last_date.slice(0, 10)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.streak({ id: streak.id })}
                    title={'Show streak ' + streak.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editStreak({ id: streak.id })}
                    title={'Edit streak ' + streak.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete streak ' + streak.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(streak.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreaksList;
