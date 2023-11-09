import type { EditCallLogById, UpdateCallLogInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CallLogForm from 'src/components/CallLog/CallLogForm';

export const QUERY = gql`
  query EditCallLogById($id: Int!, $personId: Int!) {
    callLog: callLog(id: $id, personId: $personId) {
      id
      note
    }
  }
`;
const UPDATE_CALL_LOG_MUTATION = gql`
  mutation UpdateCallLogMutation($id: Int!, $input: UpdateCallLogInput!) {
    updateCallLog(id: $id, input: $input) {
      id
      note
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ callLog, personId }: CellSuccessProps<EditCallLogById> & { personId: number }) => {
  const [updateCallLog, { loading, error }] = useMutation(UPDATE_CALL_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('CallLog updated');
      navigate(routes.callLogs({ personId }));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateCallLogInput, id: EditCallLogById['callLog']['id']) => {
    updateCallLog({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit CallLog {callLog?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CallLogForm callLog={callLog} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
