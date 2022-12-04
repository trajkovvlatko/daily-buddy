import type { FindNotes } from 'types/graphql';
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
      path
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return <div className="rw-text-center">{'No notes yet. '}</div>;
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

  const toggleEditMode = () => {
    if (editMode) {
      if (confirm('Are you sure you want to cancel?')) {
        setEditMode(!editMode);
      }
    } else {
      setEditMode(!editMode);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-0 md:grid md:grid-cols-12 md:pt-6">
      <div className="md:col-span-2"></div>
      <div className="mb-6 min-h-[85vh] bg-white pt-6 shadow-lg md:col-span-8 md:grid md:grid-cols-12 md:gap-8">
        <div className="mb-6 h-[50vh] overflow-y-auto border-r pb-6 md:col-span-3 md:mb-0 md:h-auto md:max-h-[80vh]">
          <h2 className="mb-5 pl-5 text-lg font-semibold">Notes</h2>
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

        <div className="pb-3 pl-2 pr-6 md:col-span-9">
          {selectedNoteId && (
            <>
              <button
                onClick={toggleEditMode}
                className="rounded bg-blue-500 py-1 px-4 text-white hover:bg-blue-700 md:float-right"
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
