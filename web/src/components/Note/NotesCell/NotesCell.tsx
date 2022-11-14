import type { FindNotes } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Notes from 'src/components/Note/Notes';

export const QUERY = gql`
  query FindNotes {
    notes {
      id
      parentId
      title
      content
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No notes yet. '}
      <Link to={routes.newNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ notes }: CellSuccessProps<FindNotes>) => {
  return <Notes notes={notes} />;
};
