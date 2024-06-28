import { useState } from 'react';

import type { FindNotes } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import PageWrapper from 'src/components/PageWrapper/PageWrapper';

import EditNoteCell from '../EditNoteCell';
import NoteCell from '../NoteCell';

import { AddNewNote } from './AddNewNote';
import { NoteLink } from './NoteLink';

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
  const [selectedNote, setSelectedNote] = useState<{ id: number; shared: boolean } | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const onUpdate = () => {
    setEditMode(false);
  };

  const onDelete = () => {
    setEditMode(false);
    setSelectedNote(null);
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
                onClick={() => setSelectedNote({ id: note.id, shared: false })}
                note={note}
                isSelected={selectedNote?.id === note.id}
                shouldPad={true}
              />
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
                  <NoteLink
                    onClick={() => setSelectedNote({ id: note.id, shared: true })}
                    note={note}
                    isSelected={selectedNote?.id === note.id}
                    shouldPad={false}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="main-content">
        {selectedNote && (
          <>
            <button onClick={toggleEditMode} className="blue-button md:float-right">
              {editMode ? 'Close' : 'Edit'}
            </button>
            {editMode ? (
              <EditNoteCell id={selectedNote.id} shared={selectedNote.shared} onUpdate={onUpdate} onDelete={onDelete} />
            ) : (
              <NoteCell id={selectedNote.id} />
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
};
