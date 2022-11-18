import { useMutation } from '@redwoodjs/web';
import { useState } from 'react';
import { NoteTree } from 'types/graphql';
import { toast } from '@redwoodjs/web/toast';

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNoteMutation($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
    }
  }
`;

export const AddNewNote = ({ note }: { note: NoteTree }) => {
  const [showNewForm, setShowNewForm] = useState(false);

  const [createNote] = useMutation(CREATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note created');
      setShowNewForm(false);
    },
    refetchQueries: ['FindNotes'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (e: any) => {
    if (e.key === 'Enter') {
      createNote({ variables: { input: { parentId: note.id, title: e.target.value.trim(), content: '' } } });
    }
  };

  return (
    <>
      <button onClick={() => setShowNewForm(!showNewForm)} className="hidden w-12 flex-auto">
        +
      </button>
      {showNewForm && (
        <div className="ml-3 mr-3 w-full">
          <input type="text" className="w-full border-2" onKeyUp={onSave} />
        </div>
      )}
    </>
  );
};
