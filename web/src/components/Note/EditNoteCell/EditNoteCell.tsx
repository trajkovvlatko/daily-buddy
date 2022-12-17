import type { EditNoteById, UpdateNoteInput } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import NoteForm from 'src/components/Note/NoteForm';
import type { DeleteNoteMutationVariables } from 'types/graphql';

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

interface ExtraProps {
  onUpdate: () => void;
  onDelete: () => void;
}

export const Success = ({ note, onUpdate, onDelete }: CellSuccessProps<EditNoteById> & ExtraProps) => {
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note deleted');
      onDelete();
    },
    refetchQueries: ['FindNotes'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note updated');
      onUpdate();
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
      <NoteForm note={note} onSave={onSave} error={error} loading={loading} />

      <button type="button" className="red-button mt-3" onClick={() => onDeleteClick(note.id)}>
        Delete
      </button>
    </div>
  );
};
