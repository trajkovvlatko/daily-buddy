import React from 'react';
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
        Add stage
      </button>
      {error && <div className="rw-text-red">{error.message}</div>}
    </div>
  );
};

export default NewProjectStageForm;
