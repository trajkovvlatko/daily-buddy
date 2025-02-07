import React from 'react';
import Stage from './Stage';
import type { ProjectStage } from 'types/graphql';
import NewProjectStageForm from './NewProjectStageForm';

const Stages = ({ stages, projectId }: { stages: ProjectStage[]; projectId: number }) => {
  const allStages = stages.map((stage) => ({ id: stage.id, name: stage.name }));

  return (
    <div className="flex overflow-auto">
      {stages.map((stage, index) => (
        <Stage key={index} stage={stage} allStages={allStages} />
      ))}
      <NewProjectStageForm projectId={projectId} />
    </div>
  );
};

export default Stages;
