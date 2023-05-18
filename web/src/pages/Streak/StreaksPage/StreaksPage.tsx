import { Link, routes } from '@redwoodjs/router';

import StreaksCell from 'src/components/Streak/StreaksCell';

const StreaksPage = () => {
  return (
    <div>
      <Link to={routes.newStreak()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New Streak
      </Link>
      <StreaksCell />
    </div>
  );
};

export default StreaksPage;
