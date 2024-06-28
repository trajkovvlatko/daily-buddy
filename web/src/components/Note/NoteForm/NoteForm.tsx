import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import type { EditNoteById, UpdateNoteInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, Submit, TextField } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

type FormNote = NonNullable<EditNoteById['note']>;

interface NoteFormProps {
  note?: EditNoteById['note'];
  onSave: (data: UpdateNoteInput, id?: FormNote['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const NoteForm = (props: NoteFormProps) => {
  const editor = useCreateBlockNote({ initialContent: [{ id: 'note' }] });

  editor.tryParseMarkdownToBlocks(props.note?.content ?? '').then((parsed) => {
    editor.insertBlocks(parsed, { id: 'note' });
  });

  const onSubmit = async (data: FormNote) => {
    const content = await editor.blocksToMarkdownLossy();

    props.onSave({ ...data, content }, props?.note?.id);
  };

  return (
    <Form<FormNote> onSubmit={onSubmit} error={props.error}>
      <FormError error={props.error} />

      <Label name="path" className="rw-label" errorClassName="rw-label rw-label-error">
        Path
      </Label>

      <TextField
        name="path"
        defaultValue={props.note?.path}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="path" className="rw-field-error" />

      <Label name="content" className="rw-label" errorClassName="rw-label rw-label-error">
        Content
      </Label>

      <BlockNoteView editor={editor} />

      <FieldError name="content" className="rw-field-error" />

      <div className="float-right">
        <Submit disabled={props.loading} className="blue-button mt-3">
          Save
        </Submit>
      </div>
    </Form>
  );
};

export default NoteForm;
