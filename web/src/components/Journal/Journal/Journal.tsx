import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteJournalMutationVariables, FindJournalById } from 'types/graphql';

const DELETE_JOURNAL_MUTATION = gql`
  mutation DeleteJournalMutation($id: Int!) {
    deleteJournal(id: $id) {
      id
    }
  }
`;

interface Props {
  journal: NonNullable<FindJournalById['journal']>;
}

const Journal = ({ journal }: Props) => {
  const [deleteJournal] = useMutation(DELETE_JOURNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Journal deleted');
      navigate(routes.journals());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteJournalMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journal ' + id + '?')) {
      deleteJournal({ variables: { id } });
    }
  };

  return (
    <>
      <div className="flex-column flex">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Journal {journal.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{journal.id}</td>
            </tr>
            <tr>
              <th>For date</th>
              <td>{timeTag(journal.forDate)}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{journal.content}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(journal.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{journal.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editJournal({ id: journal.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(journal.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Journal;
