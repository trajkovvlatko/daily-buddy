import type { EditSettingById, UpdateSettingInput } from "types/graphql";

import type { RWGqlError } from "@redwoodjs/forms";
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from "@redwoodjs/forms";

type FormSetting = NonNullable<EditSettingById["setting"]>;

interface SettingFormProps {
  setting?: EditSettingById["setting"];
  onSave: (data: UpdateSettingInput, id?: FormSetting["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const SettingForm = (props: SettingFormProps) => {
  const onSubmit = (data: FormSetting) => {
    props.onSave(data, props?.setting?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormSetting> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="key"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Key
        </Label>

        <TextField
          name="key"
          defaultValue={props.setting?.key}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="key" className="rw-field-error" />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>

        <TextField
          name="value"
          defaultValue={props.setting?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="value" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default SettingForm;
