import { ActiveTab } from '../../../types/shared';
import TabButton from './TabButton';

interface Props {
  activeTab: ActiveTab;
  onClick: (tab: ActiveTab) => void;
}

const TabButtons = ({ activeTab, onClick }: Props) => {
  return (
    <div className="visible mb-2 flex justify-center md:invisible md:mb-0">
      <TabButton activeTab={activeTab} currentTab="calendar" onClick={onClick} title="Calendars" />
      <TabButton activeTab={activeTab} currentTab="tasks" onClick={onClick} title="Tasks" />
    </div>
  );
};

export default TabButtons;
