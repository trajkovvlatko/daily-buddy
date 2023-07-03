import type { FindGroceries } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Groceries from 'src/components/Grocery/Groceries';

import NewGrocery from '../NewGrocery/NewGrocery';

export const QUERY = gql`
  query FindGroceries {
    groceries {
      id
      name
      boughtAt
      expireAt
      nearExpireDate
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No groceries yet. '}
      <Link to={routes.newGrocery()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ groceries }: CellSuccessProps<FindGroceries>) => {
  return (
    <div className="grid-cols-12 md:grid md:p-6">
      <div className="md:col-span-4 md:mr-6">
        <NewGrocery />
      </div>
      <div className="md:col-span-8 md:max-h-[95vh] md:overflow-y-auto">
        <Groceries groceries={groceries} />
      </div>
    </div>
  );
};
