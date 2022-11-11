import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import TaskForm from 'src/components/Task/TaskForm';
import type { CreateTaskInput } from 'types/graphql';

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;

const NewTask = () => {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: ['FindTasks'],
    onCompleted: () => {
      toast.success('Task created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateTaskInput) => {
    createTask({ variables: { input } });
  };

  return (
    <>
      <div className="">
        <TaskForm onSave={onSave} loading={loading} error={error} />
      </div>
    </>
  );
};

export default NewTask;
