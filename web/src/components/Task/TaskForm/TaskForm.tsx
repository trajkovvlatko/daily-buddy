import { useRef } from 'react';

import type { EditTaskById, UpdateTaskInput } from 'types/graphql';

import { Form, FormError, FieldError, TextField, NumberField, Submit, DateField } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

import { getDefaultDate } from 'src/lib/getDefaultDate';

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
    refPriority.current.value = '3';
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <Form<FormTask> onSubmit={onSubmit} error={props.error}>
        <table className="rw-table table-fixed">
          <tbody>
            <tr>
              <td>
                <FormError
                  error={props.error}
                  wrapperClassName="rw-form-error-wrapper"
                  titleClassName="rw-form-error-title"
                  listClassName="rw-form-error-list"
                />
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  name="title"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  placeholder="Add a todo here"
                  validation={{ required: true }}
                  ref={refTitle}
                />

                <FieldError name="title" className="rw-field-error" />
              </td>
            </tr>
            <tr>
              <td>
                <DateField
                  name="dueDate"
                  className="rw-input"
                  placeholder="Due date"
                  errorClassName="rw-input rw-input-error"
                  defaultValue={getDefaultDate()}
                  ref={refDueDate}
                />

                <FieldError name="dueDate" className="rw-field-error" />
              </td>
            </tr>
            <tr>
              <td>
                <NumberField
                  name="priority"
                  defaultValue={3}
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{ required: true }}
                  placeholder="Priority"
                  ref={refPriority}
                />

                <FieldError name="priority" className="rw-field-error" />
              </td>
            </tr>
            <tr>
              <td className="flex justify-center">
                <Submit disabled={props.loading} className="blue-button">
                  Save
                </Submit>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
};

export default TaskForm;
