import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { CreateProjectInput } from 'types/graphql';

import ProjectForm from 'src/components/Project/ProjectForm/ProjectForm';
import { navigate, routes } from '@redwoodjs/router';

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`;

const NewProject = () => {
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data) => {
      toast.success('Project created');
      navigate(routes.editProject({ id: data.createProject.id }));
    },
  });

  const onSave = (input: CreateProjectInput) => {
    createProject({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Project</h2>
      </header>
      <div className="rw-segment-main">
        <ProjectForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewProject;
