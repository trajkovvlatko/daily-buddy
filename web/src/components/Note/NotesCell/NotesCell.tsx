import type { FindNotes } from 'types/graphql';
import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useState } from 'react';
import NoteCell from '../NoteCell';
import EditNoteCell from '../EditNoteCell';
import { NoteLink } from './NoteLink';
import { AddNewNote } from './AddNewNote';

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
  const [editMode, setEditMode] = useState<boolean>(false);

  const onUpdate = () => {
    setEditMode(false);
  };

  const onDelete = () => {
    setEditMode(false);
    setSelectedNoteId(null);
  };

  return (
    <div className="grid grid-cols-12 bg-gray-100 pt-6">
      <div className="col-span-2"></div>
      <div className="col-span-8 mb-6 grid grid-cols-12 gap-8 bg-white pt-6 shadow-lg">
        <div className="col-span-3 border-r pb-6">
          <h2 className="mb-5 pl-5 text-3xl">Notes</h2>
          {notes.map((note) => {
            return (
              <div className="note-menu flex flex-wrap" key={note.id}>
                <NoteLink
                  onClick={() => setSelectedNoteId(note.id)}
                  note={note}
                  isSelected={selectedNoteId === note.id}
                />
                <AddNewNote note={note} />
              </div>
            );
          })}
        </div>
        <div className="col-span-9 pb-3 pl-2 pr-6">
          {selectedNoteId && (
            <>
              <button
                onClick={() => setEditMode(!editMode)}
                className="float-right rounded bg-blue-500 py-1 px-4 text-white hover:bg-blue-700"
              >
                {editMode ? 'Preview' : 'Edit'}
              </button>
              {editMode ? (
                <EditNoteCell id={selectedNoteId} onUpdate={onUpdate} onDelete={onDelete} />
              ) : (
                <NoteCell id={selectedNoteId} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
