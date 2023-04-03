import type { FindJournalByDate, FindJournalByDateVariables } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import Journal from 'src/components/Journal/Journal';
import { useState } from 'react';
import NewJournal from '../NewJournal/NewJournal';
import EditJournalCell from '../EditJournalCell';

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

export const Empty = ({ date }: { date: string }) => {
  const [newForm, setNewForm] = useState(false);

  const toggle = () => {
    setNewForm((old) => !old);
  };

  return newForm ? (
    <NewJournal callback={toggle} />
  ) : (
    <div>
      <span className="mt-2 inline-block">{`No journal for ${date}.`}</span>
      <button onClick={toggle} className="green-button float-right">
        {'New journal'}
      </button>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ journalByDate }: CellSuccessProps<FindJournalByDate>) => {
  const [editForm, setEditForm] = useState(false);

  const toggle = () => {
    setEditForm((old) => !old);
  };

  return editForm ? (
    <EditJournalCell id={journalByDate.id} callback={toggle} />
  ) : (
    <Journal journal={journalByDate} onEditCallback={toggle} />
  );
};
