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
        <h3 className="text-lg font-semibold">{task.name}</h3>
        <p>{task.description}</p>
      </div>
      {showModal && <TaskModal task={task} onClose={handleClose} allStages={allStages} />}
    </>
  );
};

export default Task;
