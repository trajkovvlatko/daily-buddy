import type { CreateJournalInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import JournalForm from 'src/components/Journal/JournalForm';

const CREATE_JOURNAL_MUTATION = gql`
  mutation CreateJournalMutation($input: CreateJournalInput!) {
    createJournal(input: $input) {
      id
    }
  }
`;

const NewJournal = ({ callback }: { callback?: () => void }) => {
  const [createJournal, { loading, error }] = useMutation(CREATE_JOURNAL_MUTATION, {
    onCompleted: (newJournal) => {
      if (callback) {
        callback();
      } else {
        if (newJournal?.createJournal?.id) {
          navigate(routes.journal({ id: newJournal.createJournal.id }));
        }
      }

      toast.success('Journal created');
    },
    refetchQueries: ['FindLatestJournals'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateJournalInput) => {
    createJournal({ variables: { input } });
  };

  return (
    <div>
      <h2 className="mb-6 pb-6 text-lg font-bold">New Journal</h2>
      <div>
        <JournalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewJournal;
