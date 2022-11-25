import { ActiveTab } from '../../../types/shared';

interface Props {
  activeTab: ActiveTab;
  onClick: (tab: ActiveTab) => void;
  title: string;
  currentTab: ActiveTab;
}

const TabButton = ({ activeTab, onClick, title, currentTab }: Props) => {
  const tab = 'mx-1 rounded py-2 px-4 font-bold text-white';
  const active = `${tab} bg-blue-800`;
  const inactive = `${tab} bg-blue-500`;

  return (
    <button className={activeTab === currentTab ? active : inactive} onClick={() => onClick(currentTab)}>
      {title}
    </button>
  );
};

export default TabButton;
