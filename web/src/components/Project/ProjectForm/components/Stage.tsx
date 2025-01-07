import React from 'react';
import Tasks from './Tasks';
import type { ProjectStage } from 'types/graphql';
import type { AllStages } from './types';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const DELETE_PROJECT_STAGE_MUTATION = gql`
  mutation DeleteProjectStageMutation($id: Int!) {
    deleteProjectStage(id: $id) {
      id
    }
  }
`;

const Stage = ({ stage, allStages }: { stage: ProjectStage; allStages: AllStages }) => {
  const [deleteProjectStage] = useMutation(DELETE_PROJECT_STAGE_MUTATION, {
    variables: { id: stage.id },
    refetchQueries: ['EditProjectById'],
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this stage?')) {
      deleteProjectStage();
    }
  };

  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0 border">
      <div className="flex justify-between items-center p-3">
        <h2 className="text-2xl font-semibold">{stage.name}</h2>
        <button
          onClick={handleDelete}
          className="ml-4 border border-gray-300 rounded-sm w-8 h-8 flex bg-gray-200 items-center justify-center"
        >
          &times;
        </button>
      </div>
      <Tasks tasks={stage.tasks} allStages={allStages} />
    </div>
  );
};

export default Stage;
