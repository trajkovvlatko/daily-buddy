import React, { useState } from 'react';
import TaskModal from './TaskModal';
import type { ProjectTask } from 'types/graphql';
import type { AllStages } from './types';

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
        <h3 className="text-base font-semibold mb-2">{task.name}</h3>
        <p className="text-sm text-gray-500 mb-6">{task.description}</p>
        {task.dueDate && (
          <p className="text-sm text-gray-500 mb-6">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap">
            {task.labels.map((label, index) => (
              <p key={label + index} className="text-sm text-gray-500 bg-gray-100 rounded-full px-2 py-1 mr-2">
                {label}
              </p>
            ))}
          </div>
        )}
      </div>
      {showModal && <TaskModal task={task} onClose={handleClose} allStages={allStages} />}
    </>
  );
};

export default Task;
