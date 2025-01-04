import type { UpdateProjectInput, Project, ProjectTask, ProjectStage } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormProject = NonNullable<Project>;

const Task = ({ task }: { task: ProjectTask }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p>{task.description}</p>
    </div>
  );
};

const Tasks = ({ tasks }: { tasks: ProjectTask[] }) => {
  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0">
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
};

const Stage = ({ stage }: { stage: ProjectStage }) => {
  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0">
      <h2 className="text-2xl font-semibold">{stage.name}</h2>
      <Tasks tasks={stage.tasks} />
    </div>
  );
};

const Stages = ({ stages }: { stages: ProjectStage[] }) => {
  return (
    <div className="flex overflow-auto">
      {stages.map((stage, index) => (
        <Stage key={index} stage={stage} />
      ))}
    </div>
  );
};

interface ProjectFormProps {
  project?: Project;
  onSave: (data: UpdateProjectInput, id?: FormProject['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ProjectForm = (props: ProjectFormProps) => {
  const onSubmit = (data: FormProject) => {
    props.onSave(data, props?.project?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormProject> onSubmit={onSubmit} error={props.error}>
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

      {props.project?.stages?.length > 0 && <Stages stages={props.project.stages} />}
    </div>
  );
};

export default ProjectForm;
