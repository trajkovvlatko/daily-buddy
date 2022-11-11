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
    <div className="grid grid-cols-12 bg-gray-100 pt-6">
      <div className="col-span-2"></div>
      <div className="col-span-8 mb-6 grid grid-cols-12 gap-8 bg-white pt-6 shadow-lg">
        <div className="col-span-5 pl-6">
          <EventsCell from={from} to={to} />
        </div>
        <div className="col-span-7 pr-6">
          <TasksCell />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
