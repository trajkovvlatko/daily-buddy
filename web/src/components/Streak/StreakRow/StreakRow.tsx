import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';
import { Streak } from 'types/graphql';

const dateDiffInDays = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const RESET_STREAK_MUTATION = gql`
  mutation ResetStreakMutation($id: Int!, $input: UpdateStreakInput!) {
    updateStreak(id: $id, input: $input) {
      id
      name
      last_date
    }
  }
`;

const StreakRow = ({ streak }: { streak: Streak }) => {
  const [resetStreak] = useMutation(RESET_STREAK_MUTATION, {
    onCompleted: () => {
      toast.success('Streak reset.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const reset = () => {
    if (!confirm('Are you sure that you want to reset this streak?')) return;

    resetStreak({
      variables: {
        id: streak.id,
        input: {
          last_date: new Date(),
        },
      },
    });
  };

  const diff = dateDiffInDays(new Date(streak.last_date), new Date());

  return (
    <div className="flex content-center items-center justify-between gap-5 p-3">
      <div className="flex-1">{streak.name}</div>
      <div className="flex-1">
        <b>
          {diff} {diff === 1 ? 'day' : 'days'}
        </b>
      </div>
      <div>
        <button className={`red-button rounded border border-red-700 py-1 font-bold`} onClick={reset}>
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default StreakRow;
