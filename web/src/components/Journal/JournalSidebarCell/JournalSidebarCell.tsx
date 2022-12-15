import type { FindJournals } from 'types/graphql';
import { Link, Router, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { Row } from 'src/pages/Journal/EditJournalPage/Row';

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
      <h2 className="font-col mb-5 flex flex-row justify-between pl-5 text-lg">
        <span className="text-lg font-semibold">Journal</span>
        <Link
          to={routes.newJournal()}
          title={'New journal'}
          className="rw-button rw-button-green float-right mr-3 mb-6 w-16"
        >
          New
        </Link>
      </h2>
      <div className="flex flex-col">
        {journals.map((journal) => (
          <Row journal={journal} key={`journal-${journal.id}`} />
        ))}
      </div>
    </>
  );
};
