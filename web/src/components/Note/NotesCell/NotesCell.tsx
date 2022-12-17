import type { FindNotes } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useState } from 'react';
import NoteCell from '../NoteCell';
import EditNoteCell from '../EditNoteCell';
import { NoteLink } from './NoteLink';
import { AddNewNote } from './AddNewNote';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

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
    <PageWrapper>
      <div className="sidebar">
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

      <div className="main-content">
        {selectedNoteId && (
          <>
            <button onClick={toggleEditMode} className="blue-button md:float-right">
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
    </PageWrapper>
  );
};
