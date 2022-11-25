import { useState } from 'react';
import TabButtons from 'src/components/TabButtons/TabButtons';
import TasksCell from 'src/components/Task/TasksCell';
import { isMobile } from 'src/lib/isMobile';
import { ActiveTab } from 'types/shared';
import EventsCell from '../../components/EventsCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(isMobile() ? 'calendar' : 'all');
  const today = new Date();
  const endAt = new Date(today);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));

  return (
    <div className="grid-cols-12 bg-gray-100 md:grid md:pt-6">
      <TabButtons activeTab={activeTab} onClick={setActiveTab} />
      <div className="md:col-span-1"></div>
      <div className="mb-6 grid-cols-12 bg-white pt-6 shadow-lg md:col-span-8 md:grid md:gap-8">
        {(activeTab === 'all' || activeTab === 'calendar') && (
          <div className="px-2 md:order-first md:col-span-5 md:px-0 md:pl-6">
            <EventsCell from={from} to={to} />
          </div>
        )}
        {(activeTab === 'all' || activeTab === 'tasks') && (
          <div className="mt-0 px-2 md:col-span-7 md:mt-12 md:mt-0 md:px-0 md:pr-6 ">
            <TasksCell />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
