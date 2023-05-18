import { Form, FormError, FieldError, Label, TextField, Submit, TextAreaField } from '@redwoodjs/forms';
import type { EditNoteById, UpdateNoteInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormNote = NonNullable<EditNoteById['note']>;

interface NoteFormProps {
  note?: EditNoteById['note'];
  onSave: (data: UpdateNoteInput, id?: FormNote['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const NoteForm = (props: NoteFormProps) => {
  const onSubmit = (data: FormNote) => {
    props.onSave(data, props?.note?.id);
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

      <TextAreaField
        name="content"
        defaultValue={props.note?.content}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
        rows={27}
      />

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
