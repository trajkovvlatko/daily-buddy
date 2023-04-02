import type { FindJournalByDate, FindJournalByDateVariables } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import Journal from 'src/components/Journal/Journal';
import { navigate, routes } from '@redwoodjs/router';

export const QUERY = gql`
  query FindJournalByDate($date: Date!) {
    journalByDate: journalByDate(date: $date) {
      id
      forDate
      content
    }
  }
`;

export const beforeQuery = ({
  date,
}: {
  date: string;
}): GraphQLQueryHookOptions<FindJournalByDate, FindJournalByDateVariables> => {
  return {
    variables: {
      date,
    },
  };
};

export const Loading = () => <div>Loading...</div>;

export const Empty = ({ date }: { date: string }) => (
  <div>
    <span className="mt-2 inline-block">{`No journal for ${date}.`}</span>
    <button onClick={() => navigate(routes.newJournal())} className="green-button float-right">
      {'New journal'}
    </button>
  </div>
);

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ journalByDate }: CellSuccessProps<FindJournalByDate>) => {
  return <Journal journal={journalByDate} />;
};
