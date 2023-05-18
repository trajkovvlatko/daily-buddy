import { Link, routes } from '@redwoodjs/router';

import ColorsCell from 'src/components/Color/ColorsCell';

const ColorsPage = () => {
  return (
    <div>
      <Link to={routes.newColor()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New Color
      </Link>
      <ColorsCell />
    </div>
  );
};

export default ColorsPage;
