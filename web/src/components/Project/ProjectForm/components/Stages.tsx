import React from 'react';
import Stage from './Stage';
import type { ProjectStage } from 'types/graphql';
import { useMutation } from '@redwoodjs/web';
import { gql } from '@apollo/client';
import { toast } from 'react-hot-toast';

const CREATE_PROJECT_STAGE_MUTATION = gql`
  mutation CreateProjectStageMutation($input: CreateProjectStageInput!) {
    createProjectStage(input: $input) {
      id
      name
    }
  }
`;

const NewProjectStageForm = ({ projectId }: { projectId: number }) => {
  const [stageName, setStageName] = React.useState('');
  const [createProjectStage, { loading, error }] = useMutation(CREATE_PROJECT_STAGE_MUTATION, {
    onCompleted: () => {
      toast.success('Stage created');
      setStageName(''); // Clear input after creation
    },
    refetchQueries: ['EditProjectById'],
  });

  const handleAddStage = () => {
    if (stageName.trim() === '') {
      toast.error('Stage name cannot be empty');
      return;
    }

    createProjectStage({
      variables: {
        input: {
          projectId,
          name: stageName,
          sortOrder: 0, // Adjust sortOrder as needed
          // Add other necessary fields like color if needed
        },
      },
    });
  };

  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0">
      <h3 className="text-xl font-semibold">New Stage</h3>
      <input
        type="text"
        placeholder="Add a new stage"
        className="rw-input mb-2"
        value={stageName}
        onChange={(e) => setStageName(e.target.value)}
      />
      <button className="blue-button" onClick={handleAddStage} disabled={loading}>
        Add Stage
      </button>
      {error && <div className="rw-text-red">{error.message}</div>}
    </div>
  );
};

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
