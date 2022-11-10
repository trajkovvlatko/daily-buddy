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
    <div className="rw-segment mt-12">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Task</h2>
      </header>
      <div className="rw-segment-main">
        <TaskForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewTask;
