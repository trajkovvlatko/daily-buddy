import { TaskFields } from 'types/graphql';
import { truncate } from 'src/lib/formatters';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { useRef } from 'react';

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
  const refTitle = useRef<HTMLInputElement>(null);
  const refDueDate = useRef<HTMLInputElement>(null);
  const refPriority = useRef<HTMLInputElement>(null);

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

  const onKeyUp = (event: { key: string }) => {
    if (event.key === 'Enter') {
      const newTitle = refTitle.current.value.trim();
      const newDueDate = new Date(refDueDate.current.value.trim());
      const newPriority = parseInt(refPriority.current.value.trim());
      updateTask({
        variables: { id: task.id, input: { title: newTitle, dueDate: newDueDate, priority: newPriority } },
      });
    }
  };

  const dueDate = task.dueDate?.split('T')[0] ?? null;

  return (
    <tr>
      <td>
        <input type="text" defaultValue={truncate(task.title)} onKeyUp={onKeyUp} ref={refTitle} className="w-full" />
      </td>
      <td>
        <input
          type="date"
          defaultValue={dueDate}
          onKeyUp={onKeyUp}
          ref={refDueDate}
          className="w-full"
          placeholder="No due date"
        />
      </td>
      <td>
        <input
          type="number"
          defaultValue={truncate(task.priority)}
          ref={refPriority}
          onKeyUp={onKeyUp}
          className="w-12"
        />
      </td>
      <td>
        {task.completed ? (
          <button
            className={`rounded border border-orange-700 bg-orange-500 py-1 px-4 font-bold text-white hover:bg-orange-700`}
            onClick={toggleComplete}
          >
            Mark as incomplete
          </button>
        ) : (
          <button
            className={`rounded border border-blue-700 bg-blue-500 py-1 px-4 font-bold text-white hover:bg-blue-700`}
            onClick={toggleComplete}
          >
            Mark as complete
          </button>
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
