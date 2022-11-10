import { TaskFields } from 'types/graphql';
import { truncate } from 'src/lib/formatters';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      dueDate
      priority
      completed
      completedAt
      createdAt
      userId
    }
  }
`;

const TaskRow = ({ task }: { task: TaskFields }) => {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: ['FindTasks'],
  });

  const toggleComplete = () => {
    updateTask({ variables: { id: task.id, input: { completed: !task.completed } } });
  };

  const btnColor = task.completed ? 'orange' : 'blue';

  return (
    <tr>
      <td>{truncate(task.title)}</td>
      <td>{task.dueDate ? task.dueDate.split('T')[0] : 'No due date'}</td>
      <td>{truncate(task.priority)}</td>
      <td>
        <button
          className={`border-${btnColor}-700 bg-${btnColor}-500  hover:bg-${btnColor}-700 rounded border py-1 px-4 font-bold text-white`}
          onClick={toggleComplete}
        >
          {task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
