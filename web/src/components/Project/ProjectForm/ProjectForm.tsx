import React from 'react';
import { Form, FormError, FieldError, Label, TextField, Submit, TextAreaField } from '@redwoodjs/forms';
import type { UpdateProjectInput, Project } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

interface ProjectFormProps {
  project?: Project;
  onSave: (data: UpdateProjectInput, id?: Project['id']) => void;
  error: RWGqlError;
  loading: boolean;
  onCancel?: () => void;
  onDelete?: (id: Project['id']) => void;
}

const ProjectForm = (props: ProjectFormProps) => {
  const onSubmit = (data: Project) => {
    props.onSave(data, props?.project?.id);
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onDelete(props?.project?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<Project> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.project?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label name="description" className="rw-label" errorClassName="rw-label rw-label-error">
          Description
        </Label>

        <TextAreaField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="flex justify-between mt-6">
          {props.onDelete && (
            <button className="red-button w-24" onClick={onDelete}>
              Delete
            </button>
          )}
          <div>
            {props.onCancel && (
              <button className="orange-button mr-2 w-24" onClick={onCancel}>
                Cancel
              </button>
            )}
            <Submit disabled={props.loading} className="blue-button w-24">
              Save
            </Submit>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProjectForm;
