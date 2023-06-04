import { useState } from 'react';

import MarkdownEditor from '@uiw/react-markdown-editor';
import type { EditNoteById, UpdateNoteInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

import { toolbars } from 'src/shared';

type FormNote = NonNullable<EditNoteById['note']>;

interface NoteFormProps {
  note?: EditNoteById['note'];
  onSave: (data: UpdateNoteInput, id?: FormNote['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const NoteForm = (props: NoteFormProps) => {
  const [value, setMarkdown] = useState(props.note?.content ?? '');

  const onSubmit = (data: FormNote) => {
    props.onSave({ ...data, content: value }, props?.note?.id);
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

      <MarkdownEditor value={value} onChange={(value) => setMarkdown(value)} enableScroll={true} toolbars={toolbars} />

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
