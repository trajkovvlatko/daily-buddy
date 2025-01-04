import type { UpdateProjectInput, Project, ProjectTask, ProjectStage } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { useState } from 'react';

type FormProject = NonNullable<Project>;

type AllStages = { id: number; name: string }[];

const TaskModal = ({ task, onClose, allStages }: { task: ProjectTask; onClose: () => void; allStages: AllStages }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg p-4 pt-16 w-[50vw] h-[50vh] sm:w-[70vw]">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl border rounded w-8 h-8 bg-gray-100"
      >
        &times;
      </button>
      <input
        type="text"
        id="taskName"
        name="taskName"
        defaultValue={task.name}
        className="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <textarea
        id="taskDescription"
        name="taskDescription"
        defaultValue={task.description}
        rows={10}
        className="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />

      <div className="flex items-center mb-4">
        <label htmlFor="projectStage" className="block text-sm font-medium text-gray-700 mr-2" style={{ width: '20%' }}>
          Stage
        </label>
        <select
          id="projectStage"
          name="projectStage"
          defaultValue={task.projectStageId}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          style={{ width: '80%' }}
        >
          {allStages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mr-2" style={{ width: '20%' }}>
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={task.dueDate}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          style={{ width: '80%' }}
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          id="labels"
          name="labels"
          defaultValue={task.labels.join(', ')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const Task = ({ task, allStages }: { task: ProjectTask; allStages: AllStages }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer" onClick={handleClick}>
        <h3 className="text-lg font-semibold">{task.name}</h3>
        <p>{task.description}</p>
      </div>
      {showModal && <TaskModal task={task} onClose={handleClose} allStages={allStages} />}
    </>
  );
};

const Tasks = ({ tasks, allStages }: { tasks: ProjectTask[]; allStages: AllStages }) => {
  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0">
      {tasks.map((task, index) => (
        <Task key={index} task={task} allStages={allStages} />
      ))}
    </div>
  );
};

const Stage = ({ stage, allStages }: { stage: ProjectStage; allStages: { id: number; name: string }[] }) => {
  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0">
      <h2 className="text-2xl font-semibold">{stage.name}</h2>
      <Tasks tasks={stage.tasks} allStages={allStages} />
    </div>
  );
};

const Stages = ({ stages }: { stages: ProjectStage[] }) => {
  const allStages = stages.map((stage) => ({ id: stage.id, name: stage.name }));

  return (
    <div className="flex overflow-auto">
      {stages.map((stage, index) => (
        <Stage key={index} stage={stage} allStages={allStages} />
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
