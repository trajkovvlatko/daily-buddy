import { Form, FormError, FieldError, Label, TextField, NumberField, Submit, DateField } from '@redwoodjs/forms';
import type { EditTaskById, UpdateTaskInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import { useRef } from 'react';

type FormTask = NonNullable<EditTaskById['task']>;

interface TaskFormProps {
  task?: EditTaskById['task'];
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const TaskForm = (props: TaskFormProps) => {
  const refTitle = useRef<HTMLInputElement | null>(null);
  const refDueDate = useRef<HTMLInputElement | null>(null);
  const refPriority = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: FormTask) => {
    props.onSave(data, props?.task?.id);
    refTitle.current.value = '';
    refDueDate.current.value = '';
    refPriority.current.value = '3';
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormTask> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="title" className="rw-label" errorClassName="rw-label rw-label-error">
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.task?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          ref={refTitle}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label name="dueDate" className="rw-label" errorClassName="rw-label rw-label-error">
          Due date
        </Label>

        <DateField
          name="dueDate"
          defaultValue={props.task?.dueDate?.split('T')[0]}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          ref={refDueDate}
        />

        <FieldError name="dueDate" className="rw-field-error" />

        <Label name="priority" className="rw-label" errorClassName="rw-label rw-label-error">
          Priority
        </Label>

        <NumberField
          name="priority"
          defaultValue={props.task?.priority ?? 3}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          ref={refPriority}
        />

        <FieldError name="priority" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default TaskForm;
