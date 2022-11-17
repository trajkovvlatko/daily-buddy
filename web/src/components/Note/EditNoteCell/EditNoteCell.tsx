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
      parentId
      title
      content
    }
  }
`;
const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: Int!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      id
      parentId
      title
      content
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ note, onUpdate }: CellSuccessProps<EditNoteById> & { onUpdate: () => void }) => {
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note deleted');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note updated');
      onUpdate();
    },
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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Note {note?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <NoteForm note={note} onSave={onSave} error={error} loading={loading} />

        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
