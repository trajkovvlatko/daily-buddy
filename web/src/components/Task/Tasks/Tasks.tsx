import type { TaskFields } from 'types/graphql';
import TaskRow from './TaskRow';

const TasksList = ({ tasks }: { tasks: TaskFields[] }) => {
  return (
    <div>
      <div className="rw-segment rw-table-wrapper-responsive">
        {tasks.map((task) => (
          <TaskRow task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
