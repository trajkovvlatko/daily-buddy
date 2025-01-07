import React from 'react';
import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { UpdateProjectInput, Project } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import Stages from './components/Stages';

interface ProjectFormProps {
  project?: Project;
  onSave: (data: UpdateProjectInput, id?: Project['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ProjectForm = (props: ProjectFormProps) => {
  const onSubmit = (data: Project) => {
    props.onSave(data, props?.project?.id);
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

        <TextField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>

      {props.project?.stages?.length > 0 && <Stages stages={props.project.stages} projectId={props.project.id} />}
    </div>
  );
};

export default ProjectForm;
