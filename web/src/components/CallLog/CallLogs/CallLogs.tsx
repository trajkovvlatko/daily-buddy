import type { DeleteCallLogMutationVariables, FindCallLogs } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CallLog/CallLogsCell';
import { truncate } from 'src/lib/formatters';

const DELETE_CALL_LOG_MUTATION = gql`
  mutation DeleteCallLogMutation($id: Int!) {
    deleteCallLog(id: $id) {
      id
    }
  }
`;

const CallLogsList = ({ callLogs, personId }: FindCallLogs & { personId: number }) => {
  const [deleteCallLog] = useMutation(DELETE_CALL_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('CallLog deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY, variables: { personId } }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteCallLogMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete callLog ' + id + '?')) {
      deleteCallLog({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Note</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {callLogs.map((callLog) => (
            <tr key={callLog.id}>
              <td>{truncate(callLog.id)}</td>
              <td>{truncate(callLog.note)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.callLog({ id: callLog.id, personId })}
                    title={'Show callLog ' + callLog.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCallLog({ id: callLog.id, personId })}
                    title={'Edit callLog ' + callLog.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete callLog ' + callLog.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(callLog.id)}
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

export default CallLogsList;
