import React, { useState } from 'react';
import Task from './Task';
import type { ProjectTask } from 'types/graphql';
import type { AllStages } from './types';
import { useMutation } from '@redwoodjs/web';

const CREATE_PROJECT_TASK_MUTATION = gql`
  mutation CreateProjectTaskMutation($input: CreateProjectTaskInput!) {
    createProjectTask(input: $input) {
      id
    }
  }
`;

const NewProjectTaskForm = ({ projectStageId }: { projectStageId: number }) => {
  const [createProjectTask] = useMutation(CREATE_PROJECT_TASK_MUTATION);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (!taskName || !taskDescription) return;

    createProjectTask({
      variables: {
        input: {
          name: taskName,
          description: taskDescription,
          labels: [],
          projectStageId,
          status: 'Pending',
        },
      },
      refetchQueries: ['EditProjectById'], // TODO: use cachek instead of refetch
      onCompleted: () => {
        setTaskName('');
        setTaskDescription('');
      },
    });
  };

  return (
    <div className="flex flex-col mt-2">
      <input
        type="text"
        placeholder="Task Name"
        className="rw-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="rw-input mb-2"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button className="rw-button rw-button-blue" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

const Tasks = ({
  tasks,
  allStages,
  projectStageId,
}: {
  tasks: ProjectTask[];
  allStages: AllStages;
  projectStageId: number;
}) => {
  return (
    <div className="flex flex-col m-2 flex-shrink-0 h-full">
      {tasks.map((task) => (
        <Task key={task.id} task={task} allStages={allStages} />
      ))}
      <div className="mt-auto">
        <NewProjectTaskForm projectStageId={projectStageId} />
      </div>
    </div>
  );
};

export default Tasks;
