import { useRef, useState } from 'react';

import { NoteTree } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
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
      <button onClick={onAdd} className="w-1/6 md:hidden">
        +
      </button>
      {showNewForm && (
        <div className="ml-3 mr-3 w-full">
          <input
            type="text"
            className="border-1 mb-3 mt-3 h-12 w-full pl-2"
            onKeyUp={onSave}
            defaultValue={`${note.path}/`}
            ref={inputRef}
          />
        </div>
      )}
    </>
  );
};
