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
    <div className="bg-white shadow-lg p-6 md:ml-6 relative top-6 w-full h-full md:w-1/2 md:h-auto">
      <h2 className="text-2xl font-bold mb-12">New Project</h2>
      <ProjectForm onSave={onSave} loading={loading} error={error} />
    </div>
  );
};

export default NewProject;
