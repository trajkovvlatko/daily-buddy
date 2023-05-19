import { useState } from 'react';

import { ArrowPathIcon, BookOpenIcon, CalendarIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

import JournalsCell from 'src/components/Journal/JournalsCell';
import TasksCell from 'src/components/Task/TasksCell';
import { isMobile } from 'src/lib/isMobile';

import EventsCell from '../../components/EventsCell';
import ListStreaksCell from '../../components/Streak/ListStreaksCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

type Panel = 'events' | 'tasks' | 'journals' | 'streaks';

const DashboardPage = () => {
  const [panel, setPanel] = useState<Panel>('events');
  const today = new Date();
  const endAt = new Date(today);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));

  const shouldShowPanel = (panelName: Panel) => {
    return !isMobile() || panel === panelName;
  };

  return (
    <div className="dashboard">
      <div className="h-100vh grid-cols-12 bg-gray-100 md:grid md:gap-5 md:pt-5">
        {shouldShowPanel('events') && (
          <div className="overflow-y-auto bg-white p-3 pb-1 shadow-lg md:col-span-3 md:ml-6 md:max-h-[95vh]">
            <EventsCell from={from} to={to} />
          </div>
        )}
        {shouldShowPanel('tasks') && (
          <div className="overflow-y-auto bg-white p-3 shadow-lg md:col-span-5 md:mt-0 md:max-h-[95vh] md:pb-6">
            <TasksCell />
          </div>
        )}
        <div className="mt-0 md:col-span-4 md:mr-6 md:max-h-[95vh] md:overflow-y-auto">
          {shouldShowPanel('streaks') && (
            <div className="bg-white p-3 shadow-lg">
              <ListStreaksCell />
            </div>
          )}
          {shouldShowPanel('journals') && (
            <div>
              <JournalsCell take={2} skip={0} />
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 h-16 w-screen bg-white shadow-[0px_0px_20px_-5px_rgba(0,0,0,0.2)] md:hidden">
        <ul className="flex h-16 items-center justify-around ">
          <li onClick={() => setPanel('events')}>
            <CalendarIcon className="h-6 w-6 text-blue-500" />
          </li>
          <li onClick={() => setPanel('tasks')}>
            <RectangleStackIcon className="h-6 w-6 text-blue-500" />
          </li>
          <li onClick={() => setPanel('journals')}>
            <BookOpenIcon className="h-6 w-6 text-blue-500" />
          </li>
          <li onClick={() => setPanel('streaks')}>
            <ArrowPathIcon className="h-6 w-6 text-blue-500" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
