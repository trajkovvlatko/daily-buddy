import type { EditStreakById, UpdateStreakInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit, DateField } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

const formatDatetime = (value) => {
  if (value) {
    return value.slice(0, 10);
  }
};

type FormStreak = NonNullable<EditStreakById['streak']>;

interface StreakFormProps {
  streak?: EditStreakById['streak'];
  onSave: (data: UpdateStreakInput, id?: FormStreak['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const StreakForm = (props: StreakFormProps) => {
  const onSubmit = (data: FormStreak) => {
    props.onSave(data, props?.streak?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormStreak> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.streak?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label name="last_date" className="rw-label" errorClassName="rw-label rw-label-error">
          Last date
        </Label>

        <DateField
          name="last_date"
          defaultValue={formatDatetime(props.streak?.last_date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="last_date" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default StreakForm;
