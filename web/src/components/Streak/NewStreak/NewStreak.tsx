import type { CreateStreakInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import StreakForm from 'src/components/Streak/StreakForm';

const CREATE_STREAK_MUTATION = gql`
  mutation CreateStreakMutation($input: CreateStreakInput!) {
    createStreak(input: $input) {
      id
    }
  }
`;

const NewStreak = () => {
  const [createStreak, { loading, error }] = useMutation(CREATE_STREAK_MUTATION, {
    onCompleted: () => {
      toast.success('Streak created');
      navigate(routes.streaks());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateStreakInput) => {
    createStreak({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Streak</h2>
      </header>
      <div className="rw-segment-main">
        <StreakForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewStreak;
