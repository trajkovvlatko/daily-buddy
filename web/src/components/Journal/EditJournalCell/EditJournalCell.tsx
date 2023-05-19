import type { EditJournalById, EditJournalByIdVariables, UpdateJournalInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import JournalForm from 'src/components/Journal/JournalForm';

export const QUERY = gql`
  query EditJournalById($id: Int!) {
    journal: journal(id: $id) {
      id
      forDate
      content
    }
  }
`;
const UPDATE_JOURNAL_MUTATION = gql`
  mutation UpdateJournalMutation($id: Int!, $input: UpdateJournalInput!) {
    updateJournal(id: $id, input: $input) {
      id
      forDate
      content
    }
  }
`;

export const beforeQuery = ({
  id,
}: {
  id: number;
}): GraphQLQueryHookOptions<EditJournalById, EditJournalByIdVariables> => {
  return {
    variables: {
      id,
    },
    // Doesn't reload content with default fetchPolicy
    fetchPolicy: 'network-only',
  };
};

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

type Props = CellSuccessProps<EditJournalById> & { callback?: () => void };

export const Success = ({ journal, callback }: Props) => {
  const [updateJournal, { loading, error }] = useMutation(UPDATE_JOURNAL_MUTATION, {
    onCompleted: () => {
      if (callback) {
        callback();
      } else {
        navigate(routes.journal({ id: journal.id }));
      }

      toast.success('Journal updated');
    },
    refetchQueries: ['FindJournalByDate'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateJournalInput, id: EditJournalById['journal']['id']) => {
    updateJournal({ variables: { id, input } });
  };

  const onPreview = () => {
    if (confirm('Are you sure you want to cancel?')) {
      if (callback) {
        callback();
      } else {
        navigate(routes.journal({ id: journal.id }));
      }
    }
  };

  return (
    <div>
      <div>
        <button onClick={onPreview} className="blue-button md:float-right">
          Close
        </button>
      </div>
      <div className="clear-both mb-4">
        <JournalForm journal={journal} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
