import { useState } from 'react';

import type { FindLatestJournals, FindLatestJournalsVariables, Journal as JournalType } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Journal from 'src/components/Journal/Journal';

import EditJournalCell from '../EditJournalCell';
import NewJournal from '../NewJournal/NewJournal';

export const QUERY = gql`
  query FindLatestJournals($skip: Int!, $take: Int!) {
    journals(skip: $skip, take: $take) {
      id
      forDate
      content
    }
  }
`;

export const beforeQuery = ({
  skip,
  take,
}: {
  skip: number;
  take: number;
}): GraphQLQueryHookOptions<FindLatestJournals, FindLatestJournalsVariables> => {
  return {
    variables: {
      skip,
      take,
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

const Row = ({ journal }: { journal: JournalType }) => {
  const [editForm, setEditForm] = useState(false);

  const toggle = () => {
    setEditForm((old) => !old);
  };

  return editForm ? (
    <EditJournalCell id={journal.id} callback={toggle} />
  ) : (
    <Journal journal={journal} onEditCallback={toggle} />
  );
};

const New = () => {
  const [newForm, setNewForm] = useState(false);

  const toggle = () => {
    setNewForm((old) => !old);
  };

  return newForm ? (
    <div className="bg-white p-3 shadow-lg md:mt-3">
      <div className="flex justify-end">
        <button onClick={toggle} title={'Close'} className="green-button">
          Close
        </button>
      </div>
      <NewJournal callback={toggle} />
    </div>
  ) : (
    <div className="flex justify-end bg-white p-3 shadow-lg md:mt-3">
      <button onClick={toggle} title={'New journal'} className="green-button">
        New journal
      </button>
    </div>
  );
};

export const Success = ({ journals }: CellSuccessProps<FindLatestJournals>) => {
  return (
    <>
      <New />
      {journals.map((journal) => (
        <div className="mt-3 bg-white p-3 shadow-lg" key={journal.id}>
          <Row journal={journal} />
        </div>
      ))}
    </>
  );
};
