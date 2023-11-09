import type { DeleteCallLogMutationVariables, FindCallLogById } from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_CALL_LOG_MUTATION = gql`
  mutation DeleteCallLogMutation($id: Int!) {
    deleteCallLog(id: $id) {
      id
    }
  }
`;

interface Props {
  callLog: NonNullable<FindCallLogById['callLog']>;
  personId: number;
}

const CallLog = ({ callLog, personId }: Props) => {
  const [deleteCallLog] = useMutation(DELETE_CALL_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('CallLog deleted');
      navigate(routes.callLogs({ personId }));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteCallLogMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete callLog ' + id + '?')) {
      deleteCallLog({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">CallLog {callLog.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{callLog.id}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{callLog.note}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editCallLog({ id: callLog.id, personId })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(callLog.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default CallLog;
