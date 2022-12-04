import { Link, routes } from '@redwoodjs/router';
import { useAuth } from '@redwoodjs/auth';

const MenuList = ({ callback }: { callback: () => void }) => {
  const { isAuthenticated, logOut } = useAuth();

  const handleLogOut = async () => {
    callback();
    await logOut();
    window.location.pathname = '/';
  };

  const onCalendarLinkClick = () => {
    callback();
  };

  return (
    <ul className="">
      <li className="w-52 cursor-pointer border-b px-3 pt-3 pb-3">
        <Link to={routes.calendars()} onClick={onCalendarLinkClick}>
          Calendars
        </Link>
      </li>
      {isAuthenticated && (
        <li className="w-52 cursor-pointer px-3 pb-3 pt-3">
          <button type="button" onClick={handleLogOut}>
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default MenuList;
