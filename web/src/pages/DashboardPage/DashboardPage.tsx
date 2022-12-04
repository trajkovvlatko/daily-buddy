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
    <div className="grid-cols-12 bg-gray-100 md:grid md:pt-6">
      <div className="md:col-span-2"></div>
      <div className="mb-6 grid-cols-12 bg-white pt-6 shadow-lg md:col-span-8 md:grid md:gap-8">
        <div className="max-h-[40vh] overflow-y-auto px-2 md:order-first md:col-span-5 md:max-h-[100vh] md:px-0 md:pl-6 ">
          <EventsCell from={from} to={to} />
        </div>
        <div className="mt-12 px-2 md:col-span-7 md:mt-0 md:px-0 md:pr-6 ">
          <TasksCell />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
