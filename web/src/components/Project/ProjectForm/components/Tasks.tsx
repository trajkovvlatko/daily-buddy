import React from 'react';
import Task from './Task';
import type { ProjectTask } from 'types/graphql';
import type { AllStages } from './types';

const Tasks = ({ tasks, allStages }: { tasks: ProjectTask[]; allStages: AllStages }) => {
  return (
    <div className="flex flex-col m-2 flex-shrink-0">
      {tasks.map((task, index) => (
        <Task key={index} task={task} allStages={allStages} />
      ))}
    </div>
  );
};

export default Tasks;
