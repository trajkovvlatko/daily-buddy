import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

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
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Note {note.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{note.id}</td>
            </tr>
            <tr>
              <th>Parent id</th>
              <td>{note.parentId}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{note.title}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{note.content}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(note.createdAt)}</td>
            </tr>
          </tbody>
        </table>
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
