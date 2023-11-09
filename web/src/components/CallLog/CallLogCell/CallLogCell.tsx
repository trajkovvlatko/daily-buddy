import type { FindCallLogById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CallLog from 'src/components/CallLog/CallLog';

export const QUERY = gql`
  query FindCallLogById($id: Int!, $personId: Int!) {
    callLog: callLog(id: $id, personId: $personId) {
      id
      note
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>CallLog not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ callLog, personId }: CellSuccessProps<FindCallLogById> & { personId: number }) => {
  return <CallLog callLog={callLog} personId={personId} />;
};
