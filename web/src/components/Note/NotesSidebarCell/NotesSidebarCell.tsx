import type { FindNotes } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { AddNewNote } from '../NotesCell/AddNewNote';
import { NoteLink } from '../NotesCell/NoteLink';

export const QUERY = gql`
  query FindNotes {
    notes {
      id
      path
    }
    sharedNotes {
      id
      path
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return <div className="rw-text-center">{'No notes yet. '}</div>;
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ notes, sharedNotes }: CellSuccessProps<FindNotes>) => {
  return (
    <div className="sidebar">
      <h2 className="mb-5 pl-5 text-lg font-semibold">Notes</h2>
      {notes.map((note) => {
        return (
          <div className="note-menu flex flex-wrap" key={note.id}>
            <NoteLink note={note} shouldPad={true} />
            <AddNewNote note={note} />
          </div>
        );
      })}
      {!!sharedNotes.length && (
        <>
          <h2 className="mb-5 mt-5 pl-5 text-lg font-semibold">Shared notes</h2>
          {sharedNotes.map((note) => {
            return (
              <div className="note-menu flex flex-wrap" key={note.id}>
                <NoteLink note={note} shouldPad={false} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
