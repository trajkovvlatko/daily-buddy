import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Note/NotesCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type { DeleteNoteMutationVariables, FindNotes } from 'types/graphql';

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const NotesList = ({ notes }: FindNotes) => {
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteNoteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete note ' + id + '?')) {
      deleteNote({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Parent id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{truncate(note.id)}</td>
              <td>{truncate(note.parentId)}</td>
              <td>{truncate(note.title)}</td>
              <td>{truncate(note.content)}</td>
              <td>{timeTag(note.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.note({ id: note.id })}
                    title={'Show note ' + note.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editNote({ id: note.id })}
                    title={'Edit note ' + note.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete note ' + note.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(note.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesList;
