import { Form, FormError, Label, Submit, TextAreaField } from '@redwoodjs/forms';

import type { EditJournalById, UpdateJournalInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormJournal = NonNullable<EditJournalById['journal']>;

interface JournalFormProps {
  journal?: EditJournalById['journal'];
  onSave: (data: UpdateJournalInput, id?: FormJournal['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const JournalForm = (props: JournalFormProps) => {
  console.log(props?.journal?.content);
  const onSubmit = (data: FormJournal) => {
    props.onSave(data, props?.journal?.id);
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

        <input name="forDate" defaultValue={props.journal?.forDate} className="rw-input" required={true} />

        <Label name="content" className="rw-label" errorClassName="rw-label rw-label-error">
          Content
        </Label>

        <TextAreaField
          name="content"
          defaultValue={props.journal?.content}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          rows={20}
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default JournalForm;
