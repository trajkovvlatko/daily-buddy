import { Link, routes } from '@redwoodjs/router';
import { useAuth } from '@redwoodjs/auth';

const MenuList = () => {
  const { isAuthenticated, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    window.location.pathname = '/';
  };

  return (
    <ul className="">
      <li className="w-52 cursor-pointer border-b px-3 pt-3 pb-3">
        <Link to={routes.calendars()} className="">
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
