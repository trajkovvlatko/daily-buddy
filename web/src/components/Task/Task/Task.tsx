import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { checkboxInputTag, timeTag } from 'src/lib/formatters';

import type { DeleteTaskMutationVariables, FindTaskById } from 'types/graphql';

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

interface Props {
  task: NonNullable<FindTaskById['task']>;
}

const Task = ({ task }: Props) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted');
      navigate(routes.tasks());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Task {task.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{task.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{task.title}</td>
            </tr>
            <tr>
              <th>Due date</th>
              <td>{timeTag(task.dueDate)}</td>
            </tr>
            <tr>
              <th>Priority</th>
              <td>{task.priority}</td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>{checkboxInputTag(task.completed)}</td>
            </tr>
            <tr>
              <th>Completed at</th>
              <td>{timeTag(task.completedAt)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(task.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{task.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editTask({ id: task.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(task.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Task;
