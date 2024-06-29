import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import type { DeleteJournalMutationVariables, EditJournalById, UpdateJournalInput } from 'types/graphql';

import { DateField, Form, FormError, Label, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { getDefaultDate } from 'src/lib/getDefaultDate';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

type FormJournal = NonNullable<EditJournalById['journal']>;

const DELETE_JOURNAL_MUTATION = gql`
  mutation DeleteJournalMutation($id: Int!) {
    deleteJournal(id: $id) {
      id
    }
  }
`;

interface JournalFormProps {
  journal?: EditJournalById['journal'];
  onSave: (data: UpdateJournalInput, id?: FormJournal['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const JournalForm = (props: JournalFormProps) => {
  const editor = useCreateBlockNote({ initialContent: [{ id: 'journal' }] });

  editor.tryParseMarkdownToBlocks(props.journal?.content ?? '').then((parsed) => {
    editor.insertBlocks(parsed, { id: 'journal' });
  });

  const [deleteJournal] = useMutation(DELETE_JOURNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Journal deleted');
      navigate(routes.journals());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: FormJournal) => {
    const value = await editor.blocksToMarkdownLossy(editor.document);

    props.onSave({ ...data, content: value }, props?.journal?.id);
  };

  const onDeleteClick = (id: DeleteJournalMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete journal ' + id + '?')) {
      deleteJournal({ variables: { id } });
    }
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormJournal> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label name="forDate" className="rw-label" errorClassName="rw-label rw-label-error">
          For date
        </Label>
        <DateField
          name="forDate"
          defaultValue={props.journal?.forDate?.slice(0, 10) ?? getDefaultDate()}
          className="rw-input"
          required={true}
        />
        <Label name="content" className="rw-label" errorClassName="rw-label rw-label-error">
          Content
        </Label>
        <BlockNoteView editor={editor} theme="light" />
        <div className="float-right mt-6">
          <Submit disabled={props.loading} className="blue-button">
            Save
          </Submit>
        </div>
      </Form>

      {props.journal && (
        <div className="mt-6">
          <button type="button" className="red-button" onClick={() => onDeleteClick(props.journal?.id)}>
            Delete
          </button>
        </div>
      )}
      <div className="clear-both"></div>
    </div>
  );
};

export default JournalForm;
