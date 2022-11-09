import { Link, routes } from '@redwoodjs/router';
import TasksCell from 'src/components/Task/TasksCell';

const TasksPage = () => {
  return (
    <div>
      <Link to={routes.newTask()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New Task
      </Link>
      <TasksCell />
    </div>
  );
};

export default TasksPage;
