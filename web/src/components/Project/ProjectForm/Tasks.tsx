import React from 'react';
import Task from './Task';
import type { ProjectTask } from 'types/graphql';
import type { AllStages } from './types';
import NewProjectTaskForm from './NewProjectTaskForm';

const Tasks = ({
  tasks,
  allStages,
  projectStageId,
}: {
  tasks: ProjectTask[];
  allStages: AllStages;
  projectStageId: number;
}) => {
  const [showNewTaskForm, setShowNewTaskForm] = React.useState(false);

  const toggleNewTaskForm = () => {
    setShowNewTaskForm((prev) => !prev);
  };

  return (
    <div className="flex flex-col m-2 flex-shrink-0 h-full">
      {tasks.map((task) => (
        <Task key={task.id} task={task} allStages={allStages} />
      ))}

      {showNewTaskForm && (
        <div className="flex flex-col">
          <NewProjectTaskForm projectStageId={projectStageId} closeForm={toggleNewTaskForm} />
        </div>
      )}

      {!showNewTaskForm && (
        <button className="blue-outline-button" onClick={toggleNewTaskForm}>
          Add a task
        </button>
      )}
    </div>
  );
};

export default Tasks;
