import { useMutation } from '@redwoodjs/web';
import { useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

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
      createNote({ variables: { input: { path: e.target.value.trim(), content: '' } } });
    }
  };

  const onAdd = () => {
    setShowNewForm((prev) => !prev);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <button onClick={onAdd} className="w-2 flex-auto md:hidden md:w-1">
        +
      </button>
      {showNewForm && (
        <div className="ml-3 mr-3 w-full">
          <input
            type="text"
            className="w-full border-2"
            onKeyUp={onSave}
            defaultValue={`${note.path}/`}
            ref={inputRef}
          />
        </div>
      )}
    </>
  );
};
