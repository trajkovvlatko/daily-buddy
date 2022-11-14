import type { FindNoteById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Note from 'src/components/Note/Note';

export const QUERY = gql`
  query FindNoteById($id: Int!) {
    note: note(id: $id) {
      id
      parentId
      title
      content
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Note not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ note }: CellSuccessProps<FindNoteById>) => {
  return <Note note={note} />;
};
