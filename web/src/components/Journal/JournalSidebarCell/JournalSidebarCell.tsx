import type { FindJournals } from 'types/graphql';
import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

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
      <h2 className="mb-5 pl-5 text-lg font-semibold">Journal</h2>
      {journals.map((journal) => {
        return (
          <Link
            key={`journal-${journal.id}`}
            to={routes.editJournal({ id: journal.id })}
            title={'Show journal ' + journal.id + ' detail'}
            className="rw-button rw-button-small"
          >
            {journal.forDate.slice(0, 10)}
          </Link>
        );
      })}
    </>
  );
};
