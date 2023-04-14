import type { FindStreaks } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Streaks from 'src/components/Streak/Streaks';

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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No streaks yet. '}
      <Link to={routes.newStreak()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ streaks }: CellSuccessProps<FindStreaks>) => {
  return <Streaks streaks={streaks} />;
};
