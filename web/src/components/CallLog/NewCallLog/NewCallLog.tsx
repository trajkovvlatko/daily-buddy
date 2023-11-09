import type { CreateCallLogInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CallLogForm from 'src/components/CallLog/CallLogForm';

const CREATE_CALL_LOG_MUTATION = gql`
  mutation CreateCallLogMutation($input: CreateCallLogInput!) {
    createCallLog(input: $input) {
      id
    }
  }
`;

const NewCallLog = ({ personId }: { personId: number }) => {
  const [createCallLog, { loading, error }] = useMutation(CREATE_CALL_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('CallLog created');
      navigate(routes.callLogs({ personId }));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateCallLogInput) => {
    createCallLog({ variables: { input: { ...input, personId } } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CallLog</h2>
      </header>
      <div className="rw-segment-main">
        <CallLogForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewCallLog;
