import type { FindJournalById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Journal from 'src/components/Journal/Journal';

export const QUERY = gql`
  query FindJournalById($id: Int!) {
    journal: journal(id: $id) {
      id
      forDate
      content
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Journal not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ journal }: CellSuccessProps<FindJournalById>) => {
  return <Journal journal={journal} />;
};
