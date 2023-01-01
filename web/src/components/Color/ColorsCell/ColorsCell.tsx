import type { FindColors } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Colors from 'src/components/Color/Colors';

export const QUERY = gql`
  query FindColors {
    colors {
      id
      color
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No colors yet. '}
      <Link to={routes.newColor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ colors }: CellSuccessProps<FindColors>) => {
  return <Colors colors={colors} />;
};
