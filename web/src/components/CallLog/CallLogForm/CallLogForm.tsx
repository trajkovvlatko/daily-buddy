import type { EditCallLogById, UpdateCallLogInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormCallLog = NonNullable<EditCallLogById['callLog']>;

interface CallLogFormProps {
  callLog?: EditCallLogById['callLog'];
  onSave: (data: UpdateCallLogInput, id?: FormCallLog['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const CallLogForm = (props: CallLogFormProps) => {
  const onSubmit = (data: FormCallLog) => {
    props.onSave(data, props?.callLog?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormCallLog> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="note" className="rw-label" errorClassName="rw-label rw-label-error">
          Note
        </Label>

        <TextField
          name="note"
          defaultValue={props.callLog?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="note" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default CallLogForm;
