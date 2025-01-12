import React, { useState } from 'react';
import type { ProjectTask } from 'types/graphql';
import type { AllStages } from './types';
import { useMutation } from '@redwoodjs/web';

const DELETE_PROJECT_TASK_MUTATION = gql`
  mutation DeleteProjectTaskMutation($id: Int!) {
    deleteProjectTask(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT_TASK_MUTATION = gql`
  mutation UpdateProjectTaskMutation($id: Int!, $input: UpdateProjectTaskInput!) {
    updateProjectTask(id: $id, input: $input) {
      id
    }
  }
`;

const TaskModal = ({ task, onClose, allStages }: { task: ProjectTask; onClose: () => void; allStages: AllStages }) => {
  const [deleteProjectTask] = useMutation(DELETE_PROJECT_TASK_MUTATION);
  const [updateProjectTask] = useMutation(UPDATE_PROJECT_TASK_MUTATION);

  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [taskLabels, setTaskLabels] = useState(task.labels);
  const [taskProjectStageId, setTaskProjectStageId] = useState(task.projectStageId);
  const onDelete = () => {
    deleteProjectTask({
      variables: { id: task.id },
      onCompleted: () => {
        onClose();
      },
      refetchQueries: ['EditProjectById'], // TODO: use cache instead of refetch
    });
  };

  const onSave = () => {
    updateProjectTask({
      variables: {
        id: task.id,
        input: {
          name: taskName,
          description: taskDescription,
          dueDate: taskDueDate,
          labels: taskLabels,
          projectStageId: taskProjectStageId,
        },
      },
      refetchQueries: ['EditProjectById'], // TODO: use cache instead of refetch
      onCompleted: () => {
        onClose();
      },
    });
  };

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
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
      <textarea
        id="taskDescription"
        name="taskDescription"
        value={taskDescription ?? ''}
        onChange={(e) => setTaskDescription(e.target.value)}
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
          value={taskProjectStageId}
          onChange={(e) => {
            setTaskProjectStageId(parseInt(e.target.value));
          }}
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
          value={taskDueDate?.toISOString().split('T')[0] ?? ''}
          onChange={(e) => setTaskDueDate(new Date(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          style={{ width: '80%' }}
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          id="labels"
          name="labels"
          value={taskLabels.join(', ')}
          onChange={(e) => setTaskLabels(e.target.value.split(', '))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to delete this task?')) {
              onDelete();
            }
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
