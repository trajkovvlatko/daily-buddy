import type { FindCallLogs } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CallLogs from 'src/components/CallLog/CallLogs';

export const QUERY = gql`
  query FindCallLogs($personId: Int!) {
    callLogs(personId: $personId) {
      id
      note
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = ({ personId }: { personId: number }) => {
  return (
    <div className="rw-text-center">
      {'No callLogs yet. '}
      <Link to={routes.newCallLog({ personId })} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ callLogs, personId }: CellSuccessProps<FindCallLogs> & { personId: number }) => {
  return <CallLogs callLogs={callLogs} personId={personId} />;
};
