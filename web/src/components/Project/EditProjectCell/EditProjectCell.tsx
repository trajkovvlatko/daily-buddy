import type { EditProjectById, UpdateProjectInput } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ProjectForm from 'src/components/Project/ProjectForm';

import { registerFragment } from '@redwoodjs/web/apollo';

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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Project {project?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ProjectForm project={project} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
