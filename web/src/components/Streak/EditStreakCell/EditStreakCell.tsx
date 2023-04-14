import type { EditStreakById, UpdateStreakInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import StreakForm from 'src/components/Streak/StreakForm';

export const QUERY = gql`
  query EditStreakById($id: Int!) {
    streak: streak(id: $id) {
      id
      name
      last_date
    }
  }
`;
const UPDATE_STREAK_MUTATION = gql`
  mutation UpdateStreakMutation($id: Int!, $input: UpdateStreakInput!) {
    updateStreak(id: $id, input: $input) {
      id
      name
      last_date
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ streak }: CellSuccessProps<EditStreakById>) => {
  const [updateStreak, { loading, error }] = useMutation(UPDATE_STREAK_MUTATION, {
    onCompleted: () => {
      toast.success('Streak updated');
      navigate(routes.streaks());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateStreakInput, id: EditStreakById['streak']['id']) => {
    updateStreak({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Streak {streak?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <StreakForm streak={streak} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
