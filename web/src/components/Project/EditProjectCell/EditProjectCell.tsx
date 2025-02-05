import type { EditProjectById, UpdateProjectInput } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ProjectForm from 'src/components/Project/ProjectForm';

import { registerFragment } from '@redwoodjs/web/apollo';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import Stages from '../ProjectForm/components/Stages';
import { useState } from 'react';

registerFragment(gql`
  fragment ProjectTask on ProjectTask {
    id
    name
    description
    dueDate
    sortOrder
    labels
    status
    projectStageId
  }
`);

registerFragment(gql`
  fragment ProjectStage on ProjectStage {
    id
    name
    sortOrder
    color
    projectId
    tasks {
      ...ProjectTask
    }
  }
`);

registerFragment(gql`
  fragment Project on Project {
    id
    name
    description
    stages {
      ...ProjectStage
    }
  }
`);

export const QUERY = gql`
  query EditProjectById($id: Int!) {
    project: project(id: $id) {
      ...Project
    }
  }
`;

const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProjectMutation($id: Int!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      ...Project
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ project }: CellSuccessProps<EditProjectById>) => {
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project updated');
      setShowProjectForm(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateProjectInput, id: EditProjectById['project']['id']) => {
    updateProject({ variables: { id, input } });
  };

  const onCancel = () => {
    setShowProjectForm(false);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-lg ml-6 mr-6 p-6 relative top-6 w-1/2 mb-6">
        {showProjectForm ? (
          <ProjectForm project={project} onSave={onSave} error={error} loading={loading} onCancel={onCancel} />
        ) : (
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">{project?.name}</h2>
              <p className="text-sm text-gray-500">{project?.description}</p>
            </div>
            <div>
              <button className="blue-button" onClick={() => setShowProjectForm(true)}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg ml-6 mr-6 p-3 relative top-6">
        {project?.stages?.length > 0 && <Stages stages={project.stages} projectId={project.id} />}
      </div>
    </div>
  );
};
