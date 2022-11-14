import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import NoteForm from 'src/components/Note/NoteForm';

import type { CreateNoteInput } from 'types/graphql';

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNoteMutation($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
    }
  }
`;

const NewNote = () => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note created');
      navigate(routes.notes());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateNoteInput) => {
    createNote({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Note</h2>
      </header>
      <div className="rw-segment-main">
        <NoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewNote;
