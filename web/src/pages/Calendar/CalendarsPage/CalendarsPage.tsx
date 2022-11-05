import { Link, routes } from '@redwoodjs/router';
import CalendarsCell from 'src/components/Calendar/CalendarsCell';

const CalendarsPage = () => {
  return (
    <div>
      <Link to={routes.newCalendar()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New Calendar
      </Link>
      <CalendarsCell />;
    </div>
  );
};

export default CalendarsPage;
