import React from 'react';
import Tasks from './Tasks';
import type { ProjectStage } from 'types/graphql';
import type { AllStages } from './types';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const DELETE_PROJECT_STAGE_MUTATION = gql`
  mutation DeleteProjectStageMutation($id: Int!) {
    deleteProjectStage(id: $id) {
      ...ProjectStage
    }
  }
`;

const UPDATE_PROJECT_STAGES_SORT_ORDER_MUTATION = gql`
  mutation UpdateProjectStagesSortOrderMutation($projectId: Int!, $sortOrder: [Int!]!) {
    updateProjectStagesSortOrder(projectId: $projectId, sortOrder: $sortOrder) {
      ...ProjectStage
    }
  }
`;

const Stage = ({ stage, allStages }: { stage: ProjectStage; allStages: AllStages }) => {
  const [deleteProjectStage] = useMutation(DELETE_PROJECT_STAGE_MUTATION, {
    variables: { id: stage.id },
    refetchQueries: ['EditProjectById'], // TODO: use cachek instead of refetch
  });
  const [updateProjectStagesSortOrder] = useMutation(UPDATE_PROJECT_STAGES_SORT_ORDER_MUTATION, {
    refetchQueries: ['EditProjectById'], // TODO: use cachek instead of refetch
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this stage?')) {
      deleteProjectStage();
    }
  };

  const handleMoveLeft = () => {
    const currentIndex = allStages.findIndex((s) => s.id === stage.id);
    if (currentIndex > 0) {
      const newSortOrder = [...allStages];
      [newSortOrder[currentIndex - 1], newSortOrder[currentIndex]] = [
        newSortOrder[currentIndex],
        newSortOrder[currentIndex - 1],
      ];
      updateProjectStagesSortOrder({
        variables: { projectId: stage.projectId, sortOrder: newSortOrder.map((s) => s.id) },
      });
    }
  };

  const handleMoveRight = () => {
    const currentIndex = allStages.findIndex((s) => s.id === stage.id);
    if (currentIndex < allStages.length - 1) {
      const newSortOrder = [...allStages];
      [newSortOrder[currentIndex], newSortOrder[currentIndex + 1]] = [
        newSortOrder[currentIndex + 1],
        newSortOrder[currentIndex],
      ];
      updateProjectStagesSortOrder({
        variables: { projectId: stage.projectId, sortOrder: newSortOrder.map((s) => s.id) },
      });
    }
  };

  return (
    <div className="flex flex-col w-64 m-2 flex-shrink-0 border rounded-lg bg-gray-100 bg-opacity-30">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-3">
          <h3 className="text-lg font-semibold">{stage.name}</h3>
          <button onClick={handleDelete} className="grey-outline-button">
            &times;
          </button>
        </div>
        <div className="flex flex-col flex-grow">
          <Tasks tasks={stage.tasks} allStages={allStages} projectStageId={stage.id} />
        </div>
        <div className="flex justify-between p-3">
          {stage.sortOrder !== 0 ? (
            <button onClick={handleMoveLeft} className="grey-outline-button">
              &larr;
            </button>
          ) : (
            <div />
          )}
          {stage.sortOrder !== allStages.length - 1 ? (
            <button onClick={handleMoveRight} className="grey-outline-button">
              &rarr;
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stage;
