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

const getPrioColor = (prio: number) => {
  switch (prio) {
    case 1:
      return 'bg-white';
    case 2:
      return 'bg-red-50';
    case 3:
      return 'bg-red-100';
    case 4:
      return 'bg-red-200';
    case 5:
      return 'bg-red-300';
    default:
      return 'bg-white';
  }
};

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
    updateTask({ variables: { id: task.id, input: { completed: !task.completed, completedAt: new Date() } } });
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
    <div className="flex content-center items-center justify-between gap-5 p-3 text-sm">
      <div>
        <input type="text" defaultValue={truncate(task.title)} onKeyUp={onKeyUp} ref={refTitle} className="w-full" />
      </div>
      <div>
        <input
          type="date"
          defaultValue={dueDate}
          onKeyUp={onKeyUp}
          ref={refDueDate}
          className="w-full"
          placeholder="No due date"
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue={truncate(task.priority)}
          ref={refPriority}
          onKeyUp={onKeyUp}
          className={`w-12 text-center ${getPrioColor(task.priority)}`}
        />
      </div>
      <div>
        {task.completed ? (
          <button className={`orange-button rounded border border-orange-700 py-1 font-bold`} onClick={toggleComplete}>
            &#x2715;
          </button>
        ) : (
          <button className={`blue-button rounded border border-blue-700 py-1 font-bold`} onClick={toggleComplete}>
            &#10003;
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskRow;
