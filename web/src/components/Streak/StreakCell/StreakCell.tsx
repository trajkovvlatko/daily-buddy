import type { FindStreakById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Streak from 'src/components/Streak/Streak';

export const QUERY = gql`
  query FindStreakById($id: Int!) {
    streak: streak(id: $id) {
      id
      name
      last_date
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Streak not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ streak }: CellSuccessProps<FindStreakById>) => {
  return <Streak streak={streak} />;
};
