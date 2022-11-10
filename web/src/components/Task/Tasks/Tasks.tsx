import type { TaskFields } from 'types/graphql';
import TaskRow from './TaskRow';

const TasksList = ({ tasks }: { tasks: TaskFields[] }) => {
  return (
    <div>
      <div className="rw-segment rw-table-wrapper-responsive">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due date</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow task={task} key={task.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
