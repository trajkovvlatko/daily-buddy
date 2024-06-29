import type { EditNoteById, UpdateNoteInput } from 'types/graphql';
import type { DeleteNoteMutationVariables } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ShareForm from 'src/components/Access/ShareForm/ShareForm';
import NoteForm from 'src/components/Note/NoteForm';

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const QUERY = gql`
  query EditNoteById($id: Int!) {
    note: note(id: $id) {
      id
      path
      content
      emails
    }
  }
`;

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: Int!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      id
      path
      content
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ note }: CellSuccessProps<EditNoteById>) => {
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note deleted');
      navigate(routes.notes());
    },
    refetchQueries: ['FindNotes'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note updated');
      navigate(routes.note({ id: note.id }));
    },
    refetchQueries: ['FindNotes'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateNoteInput, id: EditNoteById['note']['id']) => {
    updateNote({ variables: { id, input } });
  };

  const onDeleteClick = (id: DeleteNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete note ' + id + '?')) {
      deleteNote({ variables: { id } });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <NoteForm note={note} onSave={onSave} error={error} loading={loading} />
      </div>

      <div className="clear-both mb-6">
        <ShareForm id={note.id} type="Note" emails={note.emails} />
      </div>

      <button type="button" className="red-button mt-3" onClick={() => onDeleteClick(note.id)}>
        Delete
      </button>
    </div>
  );
};
