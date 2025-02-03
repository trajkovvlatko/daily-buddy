import type { EditProjectById, UpdateProjectInput } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ProjectForm from 'src/components/Project/ProjectForm';

import { registerFragment } from '@redwoodjs/web/apollo';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import Stages from '../ProjectForm/components/Stages';

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
  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateProjectInput, id: EditProjectById['project']['id']) => {
    updateProject({ variables: { id, input } });
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-lg ml-6 mr-6 p-6 relative top-6 w-1/2 mb-6">
        <ProjectForm project={project} onSave={onSave} error={error} loading={loading} />
      </div>

      <div className="bg-white shadow-lg ml-6 mr-6 p-6 relative top-6">
        {project?.stages?.length > 0 && <Stages stages={project.stages} projectId={project.id} />}
      </div>
    </div>
  );
};
