import { Form, FormError, FieldError, Label, NumberField, TextField, Submit } from '@redwoodjs/forms';

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
    <div className="rw-form-wrapper">
      <Form<FormNote> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="parentId" className="rw-label" errorClassName="rw-label rw-label-error">
          Parent id
        </Label>

        <NumberField
          name="parentId"
          defaultValue={props.note?.parentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="parentId" className="rw-field-error" />

        <Label name="title" className="rw-label" errorClassName="rw-label rw-label-error">
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.note?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label name="content" className="rw-label" errorClassName="rw-label rw-label-error">
          Content
        </Label>

        <TextField
          name="content"
          defaultValue={props.note?.content}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="content" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default NoteForm;
