import StreakCell from 'src/components/Streak/StreakCell';

type StreakPageProps = {
  id: number;
};

const StreakPage = ({ id }: StreakPageProps) => {
  return <StreakCell id={id} />;
};

export default StreakPage;
