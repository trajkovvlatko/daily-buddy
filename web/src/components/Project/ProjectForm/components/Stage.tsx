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
    <div className="flex flex-col w-64 m-2 flex-shrink-0 border">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-semibold">{stage.name}</h2>
          <button
            onClick={handleDelete}
            className="ml-4 border border-gray-300 rounded-sm w-8 h-8 flex bg-gray-200 items-center justify-center"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col flex-grow">
          <Tasks tasks={stage.tasks} allStages={allStages} projectStageId={stage.id} />
        </div>
        <div className="flex justify-between p-3">
          {stage.sortOrder !== 0 ? (
            <button
              onClick={handleMoveLeft}
              className="border border-gray-300 rounded-sm w-8 h-8 flex bg-gray-200 items-center justify-center"
            >
              &larr;
            </button>
          ) : (
            <div />
          )}
          {stage.sortOrder !== allStages.length - 1 ? (
            <button
              onClick={handleMoveRight}
              className="border border-gray-300 rounded-sm w-8 h-8 flex bg-gray-200 items-center justify-center"
            >
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
