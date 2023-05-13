import JournalsCell from 'src/components/Journal/JournalsCell';
import TasksCell from 'src/components/Task/TasksCell';
import EventsCell from '../../components/EventsCell';
import ListStreaksCell from '../../components/Streak/ListStreaksCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const DashboardPage = () => {
  const today = new Date();
  const endAt = new Date(today);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));

  return (
    <div className="grid-cols-12 bg-gray-100 md:grid md:gap-5 md:pt-5">
      <div className="max-h-[40vh] overflow-y-auto bg-white p-3 shadow-lg md:col-span-3 md:ml-7 md:max-h-[90vh]">
        <EventsCell from={from} to={to} />
      </div>
      <div className="mt-3 max-h-[40vh] overflow-y-auto bg-white p-3 shadow-lg md:col-span-5 md:mt-0 md:max-h-[90vh]">
        <TasksCell />
      </div>
      <div className="mt-3 md:col-span-4 md:mt-0 md:mr-7">
        <div className="bg-white p-3 shadow-lg">
          <ListStreaksCell />
        </div>
        <div>
          <JournalsCell take={2} skip={0} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
