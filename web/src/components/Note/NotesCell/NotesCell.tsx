import type { FindNotes } from 'types/graphql';
import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useState } from 'react';
import NoteCell from '../NoteCell';

export const QUERY = gql`
  query FindNotes {
    notes {
      id
      parentId
      path
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
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-12 bg-gray-100 pt-6">
      <div className="col-span-2">
        {notes.map((note) => (
          <div onClick={() => setSelectedNoteId(note.id)}>{note.path}</div>
        ))}
      </div>
      <div className="col-span-10">{selectedNoteId && <NoteCell id={selectedNoteId} />}</div>
    </div>
  );
};
