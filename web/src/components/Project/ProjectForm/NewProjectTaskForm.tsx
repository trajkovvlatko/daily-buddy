import React, { useState } from 'react';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const CREATE_PROJECT_TASK_MUTATION = gql`
  mutation CreateProjectTaskMutation($input: CreateProjectTaskInput!) {
    createProjectTask(input: $input) {
      id
    }
  }
`;

const NewProjectTaskForm = ({ projectStageId, closeForm }: { projectStageId: number; closeForm: () => void }) => {
  const [createProjectTask] = useMutation(CREATE_PROJECT_TASK_MUTATION);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (!taskName || !taskDescription) {
      toast.error('Task name and description are required');
      return;
    }

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
        closeForm();
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
      <div className="flex justify-between">
        <button className="orange-button" onClick={closeForm}>
          Cancel
        </button>
        <button className="blue-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default NewProjectTaskForm;
