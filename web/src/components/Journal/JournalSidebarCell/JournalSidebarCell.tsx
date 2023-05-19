import type { FindJournals } from 'types/graphql';

import { Link, navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { Row } from './Row';

export const QUERY = gql`
  query FindJournals {
    journals {
      id
      forDate
      content
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No journals yet. '}
      <Link to={routes.newJournal()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ journals }: CellSuccessProps<FindJournals>) => {
  return (
    <>
      <h2 className="h2">
        <span>Journal</span>
        <button
          onClick={() => navigate(routes.newJournal())}
          title={'New journal'}
          className="green-button float-right mr-3 mb-6"
        >
          New
        </button>
      </h2>
      <div className="flex flex-col">
        {journals.map((journal) => (
          <Row journal={journal} key={`journal-${journal.id}`} />
        ))}
      </div>
    </>
  );
};
