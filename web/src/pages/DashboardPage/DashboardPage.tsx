import TasksCell from 'src/components/Task/TasksCell';
import EventsCell from '../../components/EventsCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const DashboardPage = () => {
  const today = new Date();
  const endAt = new Date(today);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));

  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        <EventsCell from={from} to={to} />
      </div>
      <div>
        <TasksCell />
      </div>
    </div>
  );
};

export default DashboardPage;
