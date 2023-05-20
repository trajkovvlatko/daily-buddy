import type { FindStreaks } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import StreakRow from '../StreakRow/StreakRow';

export const QUERY = gql`
  query FindStreaks {
    streaks {
      id
      name
      last_date
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({
  streaks,

  queryResult: { refetch },
}: CellSuccessProps<FindStreaks>) => {
  const onRefresh = async () => {
    try {
      await refetch();
      toast.success('Streak counter ready');
    } catch (e) {
      toast.error('Cannot refresh streak counter');
    }
  };

  return (
    <>
      <h1 className="pb-4 pt-1 text-lg font-semibold">
        Streak counter
        <span onClick={onRefresh} className="refresh">
          ↻
        </span>
      </h1>
      {streaks.map((streak) => {
        return <StreakRow streak={streak} key={streak.id} />;
      })}
    </>
  );
};
