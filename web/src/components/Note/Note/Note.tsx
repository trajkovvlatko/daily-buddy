import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { marked } from 'marked';

import type { DeleteNoteMutationVariables, FindNoteById } from 'types/graphql';

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

interface Props {
  note: NonNullable<FindNoteById['note']>;
}

const Note = ({ note }: Props) => {
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note deleted');
      navigate(routes.notes());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete note ' + id + '?')) {
      deleteNote({ variables: { id } });
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl">{note.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(note.content) }}></div>
      </div>

      <nav className="rw-button-group">
        <Link to={routes.editNote({ id: note.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(note.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Note;
